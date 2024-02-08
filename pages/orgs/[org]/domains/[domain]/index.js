import { getResource } from '@/utilities';
import { Box, Drawer, Typography, Toolbar, Divider, List, ListItem, ListItemButton, ListItemText, AppBar, Pagination, Select, MenuItem, InputLabel, TextField, Button, Search, Menu } from '@mui/material';
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
    const [currentConcepts, setCurrentConcepts] = useState([]);
    const [selectedSubdomain, setSelectedSubdomain] = useState(null);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [total_pages, setTotalPages] = useState(1);
    const indexOfLastConcept = page * rowsPerPage;
    const indexOfFirstConcept = indexOfLastConcept - rowsPerPage;
    const [searchTerm, setSearchTerm] = React.useState("");

  const [subdomainMenuAnchor, setSubdomainMenuAnchor] = React.useState(null);
  const subdomainMenuOpen = Boolean(subdomainMenuAnchor);


    const fetchConcepts = (subdomain) => {
        setIsLoadingConcepts(true);
        setIsLoading(true);
        let url = '/api/concepts' //    ?domain=' + domain;
        if (subdomain) url = url + '?subdomainurl=' + subdomain + '&page=' + page;
        fetch(url)
            .then((d) => d.json())
            .then((data) => {
                if (data) {
                    let filteredConcepts = data?.concepts?.filter(concept => concept.type === 'Concept')
                    setConcepts(filteredConcepts);
                    setCurrentConcepts(filteredConcepts);
                    setIsLoadingConcepts(false);

                    setTotalPages(data?.data?.conceptsMeta?.pagecount ?? 1);
                    setRowsPerPage(data?.data?.conceptsMeta?.pagesize ?? 20);
                    setPage(data?.data?.conceptsMeta?.currentpage ?? 1);
                }
            })
            .catch((err) => {
                console.error('error::', err);
                setIsLoadingConcepts(false);
            });
            setIsLoading(false);
    };
    const onSubdomainClick = (subdomain) => {
        setPage(1);
        setRowsPerPage(20);
        setTotalPages(1);
        setSelectedSubdomain(subdomain.url);
        fetchConcepts(subdomain.url, 1);
    };

    const handlePerPageChange = (event) => {
        const perPageValue = parseInt(event.target.value, 10);
        setRowsPerPage(perPageValue);
        setPage(1);
    };

    const filterConcepts = (term) => {
        setSearchTerm(term);
        const filteredData = Object.values(concepts).filter((row) =>
            Object.values(row).some(
                (value) =>
                    typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
            ));
        let filtered_concepts = filteredData.slice(indexOfFirstConcept, indexOfLastConcept);
        setCurrentConcepts(filtered_concepts);
    }

    const fetchDomainData = (page = 1) => {
        fetch('/api/domains/' + domain + '?includeConcepts=true&page=' + page)
            .then((d) => d.json())
            .then((data) => {
                if (data) {
                    setDomainData(data);
                    setSubDomainData(data.data.subdomains);
                    let filteredConcepts = data?.data?.concepts.filter(concept => concept.type === 'Concept')
                    setConcepts(filteredConcepts);
                    setCurrentConcepts(filteredConcepts);
                    setTotalPages(data?.data?.conceptsMeta?.pagecount ?? 1);
                    setRowsPerPage(data?.data?.conceptsMeta?.pagesize ?? 20);
                    setPage(data?.data?.conceptsMeta?.currentpage ?? 1);
                    setIsLoading(false)
                    setIsLoadingConcepts(false)
                }
            })
            .catch((err) => {
                console.error('error::', err);
            });
    }
    useEffect(() => {
        let mounted = true;

        if (mounted && domain) {
            fetchDomainData(1);
        }

        return () => (mounted = false);
    }, [router.query]);
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
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: { xs: '100%', md: '98vw' } }}>
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
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <TextField id="outlined-basic" label="Filter Concepts" size='small' variant="outlined" sx={{ width: '100%', maxWidth: 500 }} onChange={(e) => {
                                    let term = e.target.value;
                                    if (term.length > 2) {
                                        filterConcepts(term);
                                    } else {
                                        setCurrentConcepts(concepts);
                                    }
                                }} />
                                {/* <Button variant="outlined" size='large' color='inherit' sx={{ ml: 1 }}> <Search /> </Button> */}
                            </Box>
                        </Box>
                        <hr />
                        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 2fr', md: '1fr 3fr' }, gap: 2, width: '100%', py: 1 }}>
                            {/* Desktop (sidebar) */}
                            {subDomainData?.length > 0 ?( 

                            <Box>
                            <Box sx={{ p: '10px 2px', borderRadius: '5px', display: { xs: 'none', sm: 'block' } }} className='bg-stone-100'>
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
                            {/* Mobile (dropdown) */}
                            <Box sx={{ display: { xs: 'block', sm: 'none' }, p: '10px 2px', borderRadius: '5px', width: '100%' }} className='bg-stone-100'>
                                <Typography variant='h6' sx={{ m: '4px 3px', fontWeight: 'bold' }}>Subdomains: </Typography>
                                <List
                                    component="nav"
                                    aria-label="Subdomains"
                                    sx={{ bgcolor: 'background.paper' }}
                                >
                                    <ListItemButton id="lock-button" aria-haspopup="listbox" aria-controls="subdomains-menu" aria-label="when device is locked" aria-expanded={subdomainMenuOpen ? 'true' : undefined} onClick={ev=>{
                                        setSubdomainMenuAnchor(ev.currentTarget);
                                    }}>
                                        <ListItemText primary="Select a subdomain:" secondary={subDomainData?.find(sd=>sd.url===selectedSubdomain)?.display_name || ''} />
                                    </ListItemButton>
                                </List>
                                <Menu id="subdomains-menu" subdomainMenuAnchor={subdomainMenuAnchor} open={subdomainMenuOpen} onClose={ev=>{
                                    setSubdomainMenuAnchor(null);
                                }} MenuListProps={{ 'aria-labelledby': 'lock-button', role: 'listbox' }} >
                                    {subDomainData?.map((subdomain) => (
                                        <MenuItem key={subdomain.id} selected={selectedSubdomain == subdomain.id} onClick={() => {
                                            onSubdomainClick(subdomain);
                                            setSubdomainMenuAnchor(null);
                                        }}> {subdomain.display_name} </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            </Box>) : (
                                <Box sx={{ p: '10px 2px', borderRadius: '5px', display: { xs: 'none', sm: 'block' } }} className='bg-stone-100'> 
                                </Box>
                            )}

                            <Box sx={{ padding: '16px', maxHeight: { xs: 'auto', md: '75vh' }, overflowY: 'auto' }}>
                                {isLoadingConcepts ? <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <CircularProgress />
                                </Box> : (
                                    <>
                                        {currentConcepts && currentConcepts.length > 0 ? (<Box>
                                            <Typography variant='h5' sx={{ m: '8px 5px', fontWeight: 'bold' }}>{selectedSubdomain && subDomainData?.find(sd => { return sd && sd.id == selectedSubdomain })?.display_name || ''} Concepts: </Typography>
                                            <Divider />
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                                {currentConcepts.map((concept, index) => (
                                                    concept.type == 'Concept' ?
                                                        <Box key={concept.id} sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '10px', margin: '5px', borderRadius: '5px', backgroundColor: 'white', boxShadow: '0 0 5px 0 rgba(0,0,0,0.1)' }}>
                                                            <Link
                                                                href={concept.url}
                                                                passHref style={{ textDecoration: 'none' }}>
                                                                <Typography variant='h6' className='text-blue-800' sx={{ m: '8px 5px', fontWeight: '500', ":hover": { textDecoration: 'underline', cursor: 'pointer' } }}><small>{index + 1}.</small> {concept.display_name}</Typography>
                                                            </Link>
                                                            <Box sx={{ display: 'flex', gap: 2, px: { xs: 1, sm: 2 }, color: 'GrayText', fontSize: '0.85em' }}>
                                                                <span>ID: <b className='text-black'>{concept.id}</b></span>
                                                                <span>UUID: <b className='text-black'>{concept.uuid}</b></span>
                                                                <span>Class: <b className='text-black'>{concept.concept_class}</b></span>
                                                                <span>Version: <b className='text-black'>{concept.version}</b></span>
                                                            </Box>
                                                        </Box> : null
                                                ))}
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                    <Pagination
                                                        count={parseInt(total_pages)}
                                                        page={parseInt(page)}
                                                        onChange={(event, value) => {
                                                            // setPage(value)
                                                            fetchDomainData(value)
                                                        }}
                                                    />
                                                    {/* <InputLabel id="rows-per-page-label">Rows per page</InputLabel> */}
                                                    {/* 
                                                        <Box sx={{ minWidth: '120px' }}>
                                                            <Select
                                                                value={rowsPerPage}
                                                                onChange={handlePerPageChange}
                                                                displayEmpty
                                                                inputProps={{ 'aria-label': 'Items per page' }}
                                                                sx={{ padding: '0.5px', fontSize: '0.85em' }} 
                                                            >
                                                                <MenuItem value={5}>5</MenuItem>
                                                                <MenuItem value={10}>10</MenuItem>
                                                                <MenuItem value={20}>20</MenuItem>
                                                                <MenuItem value={50}>50</MenuItem>
                                                                <MenuItem value={100}>100</MenuItem>
                                                            </Select>
                                                        </Box> 
                                                    */}
                                                </Box>


                                            </Box>
                                        </Box>)
                                            : <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}><Typography variant='h6' sx={{ m: '8px 5px', fontWeight: 'semibold' }}>No concepts found</Typography></Box>}
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
