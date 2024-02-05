import { getResource } from '@/utilities';
import { Box, Drawer, Typography, Toolbar, Divider, List, ListItem, ListItemButton, ListItemText, AppBar } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function OrgDomainsList() {
    const router = useRouter();
    const { org, domain } = router.query;
    const [domainData, setDomainData] = useState([]);
    const [subDomainData, setSubDomainData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        if (mounted && domain) {
            fetch('/api/domains/' + 'diagnostic')
                .then((d) => d.json())
                .then((data) => {
                    if (data) {
                        setDomainData(data);
                        setSubDomainData(data.data.subdomains);
                        setIsLoading(false)
                    }
                })
                .catch((err) => {
                    console.error('error::', err);
                });
        }

        return () => (mounted = false);
    }, [router.query]);

    const handleDrawerItemClick = (subdomain) => {
        console.log('Selected Subdomain:', subdomain);
    };

    return (
        <>

            {isLoading ? <CircularProgress /> :
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box sx={{ width: '100%', py: { xs: 2, md: 2 }, px: { xs: 1, md: 2 } }}>
                        <Box sx={{ bgcolor: 'white', width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                            <button
                                style={{ background: 'transparent', width: 'auto', border: 0, color: '#777', padding: 0 }}
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    router.back();
                                }}
                            >
                                &larr; Back
                            </button>
                            <Typography variant="h3" m={0} align="left" fontWeight={'bold'} color="text.primary" gutterBottom>
                                {domainData?.name}
                            </Typography>
                            <Box></Box>
                        </Box>
                        <hr />
                        <Box sx={{ display: 'flex', overflow: 'hidden' }}>
                            {/* <Drawer variant='permanent' anchor="bottom" open hideBackdrop
                            sx={{
                                width: '250px',
                                zIndex: -1,
                                flexShrink: 0,
                                [`& .MuiDrawer-paper`]: { width: '250px', boxSizing: 'border-box' },
                            }}
                        > */}

                            <Box sx={{ width: { xs: '100%', sm: '300px', p: '10px 2px', borderRadius: '5px' } }} className='bg-stone-100'>
                                <Typography variant='h5' sx={{m: '8px 5px', fontWeight: 'bold'}}>Subdomains: </Typography>
                                <Divider />
                                <List sx={{backgroundColor: 'transparent'}}>
                                    {subDomainData?.map((subdomain) => (
                                        <ListItem key={subdomain.id} disablePadding>
                                            <ListItemButton onClick={() => handleDrawerItemClick(subdomain)}>
                                                <ListItemText sx={{fontSize: '0.8em', color: 'text.primary', ":hover": {color: '#1651B6'}}} primary={subdomain.display_name} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                                <Divider />
                            </Box>
                            {/* </Drawer> */}
                            <Box sx={{ flexGrow: 1, backgroundColor: 'white', padding: '16px' }}>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            }
        </>
    );
}

export default OrgDomainsList;
