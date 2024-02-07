import { getResource } from '@/utilities';
import { Box, Drawer, Typography, Toolbar, Divider, List, ListItem, ListItemButton, ListItemText, AppBar } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link';

function OrgDomainsList() {
    const router = useRouter();
    const { org, domain } = router.query;
    const [domainData, setDomainData] = useState([]);
    const [subDomainData, setSubDomainData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingConcepts, setIsLoadingConcepts] = useState(true);
    const [concepts, setConcepts] = useState([]);
    const [selectedSubdomain, setSelectedSubdomain] = useState(null);

    const fetchConcepts = (subdomain) => {
        setIsLoadingConcepts(true);
        let url = '/api/concepts' //    ?domain=' + domain;
        if (subdomain) url = url + '?subdomainurl=' + subdomain;
        fetch(url)
            .then((d) => d.json())
            .then((data) => {
                if (data) {
                    setConcepts(data);
                    setIsLoadingConcepts(false);
                }
            })
            .catch((err) => {
                console.error('error::', err);
                setIsLoadingConcepts(false);
            });
    };

    useEffect(() => {
        let mounted = true;

        if (mounted && domain) {
            fetch('/api/domains/' + domain + '?includeConcepts=true')
                .then((d) => d.json())
                .then((data) => {
                    if (data) {
                        setDomainData(data);
                        setSubDomainData(data.data.subdomains);
                        setConcepts(data.data.concepts);
                        setIsLoading(false)
                        setIsLoadingConcepts(false)
                    }
                })
                .catch((err) => {
                    console.error('error::', err);
                });
        }

        return () => (mounted = false);
    }, [router.query]);
    const onSubdomainClick = (subdomain) => {
        // console.log('Selected Subdomain:', subdomain);
        setSelectedSubdomain(subdomain.url);
        // fetchConcepts(subdomain.id);
        fetchConcepts(subdomain.url);
    };

    return (
        <>
            <Head>
                <title>MOH KNHTS | Domain - {domain}</title>
                <meta name="description" content="MOH KNHTS" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {isLoading ? <Box sx={{ width: '100%', height: '96vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Box> :
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* <hr />
                    <details>
                        <summary>Domain Data</summary>
                        <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(domainData, null, 2)}</pre>
                    </details>
                    <hr /> */}
                    <Box sx={{ width: '100%', py: 1, px: { xs: 1, md: 2 } }}>
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
                            <Typography variant="h4" m={0} align="left" fontWeight={'bold'} color="text.primary" gutterBottom>
                                {domainData?.name}
                            </Typography>
                            <Box></Box>
                        </Box>
                        <hr />
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 2fr', md: '1fr 3fr' }, gap: 2, width: '100%', py: 1 }}>
                            <Box sx={{ p: '10px 2px', borderRadius: '5px' }} className='bg-stone-100'>
                                <Typography variant='h5' sx={{ m: '8px 5px', fontWeight: 'bold' }}>Subdomains: </Typography>
                                <Divider />
                                <List sx={{ maxHeight: { xs: 'auto', md: '70vh' }, overflowY: 'auto' }}>
                                    {subDomainData?.map((subdomain) => (
                                        <ListItem key={subdomain.id} disablePadding>
                                            <ListItemButton onClick={() => onSubdomainClick(subdomain)} selected={selectedSubdomain == subdomain.id}>
                                                <ListItemText sx={{ fontSize: '0.8em', color: 'text.primary', ":hover": { color: '#1651B6' }, "&active": { fontWeight: 'bold' } }} primary={subdomain.display_name} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                                <Divider />
                            </Box>

                            <Box sx={{ padding: '16px', maxHeight: { xs: 'auto', md: '75vh' }, overflowY: 'auto' }}>
                                {/* {JSON.stringify(concepts)} */}
                                {isLoadingConcepts ? <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <CircularProgress />
                                </Box> : (
                                    <>

                                        {concepts && concepts.length > 0 ? (<Box>
                                            <Typography variant='h5' sx={{ m: '8px 5px', fontWeight: 'bold' }}>{selectedSubdomain && subDomainData?.find(sd => { return sd && sd.id == selectedSubdomain })?.display_name || ''} Concepts: </Typography>
                                            <Divider />
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                                {concepts.map((concept, index) => (
                                                    concept.type == 'Concept' ?
                                                        <Box key={concept.id} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '10px', margin: '5px', borderRadius: '5px', backgroundColor: 'white', boxShadow: '0 0 5px 0 rgba(0,0,0,0.1)' }}>
                                                            <Link
                                                                href={concept.url}
                                                                // href={`/orgs/${org}/domains/${domain}/concepts/${concept.id}`}
                                                                passHref style={{ textDecoration: 'none' }}>
                                                                <Typography variant='h6' className='text-blue-800' sx={{ m: '8px 5px', fontWeight: '500', ":hover": { textDecoration: 'underline', cursor: 'pointer' } }}><small>{index + 1}.</small> {concept.display_name}</Typography>
                                                            </Link>
                                                            <Box sx={{ display: 'flex', gap: 2, px: { xs: 1, sm: 2 }, color: 'GrayText', fontSize: '0.85em' }}>
                                                                <span>ID: <b className='text-black'>{concept.id}</b></span>
                                                                <span>UUID: <b className='text-black'>{concept.uuid}</b></span>
                                                                <span>Class: <b className='text-black'>{concept.concept_class}</b></span>
                                                                <span>Version: <b className='text-black'>{concept.version}</b></span>
                                                            </Box>
                                                            {/* <pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(concept,null,2)}</pre> */}
                                                        </Box> : null
                                                ))}
                                            </Box>
                                        </Box>) : <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}><Typography variant='h6' sx={{ m: '8px 5px', fontWeight: 'semibold' }}>No concepts found</Typography></Box>}
                                    </>
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            }
        </>
    );
}

export default OrgDomainsList;
