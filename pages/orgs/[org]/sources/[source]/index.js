import React, { useEffect, useState } from "react";
import { Alert, AlertTitle, Box, CircularProgress, Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { getSourceConcepts } from "../../../../../pages/api/sources";
import Head from "next/head";

function SourceConcepts() {
    const router = useRouter();
    const { source, org } = router.query;
    const [isLoading, setIsLoading] = useState(true);
    const [total_pages, setTotalPages] = useState(1);
    const [rows_per_page, setRowsPerPage] = useState(50);
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
    const [isError, setIsError] = useState(false);
    const [error, setError] = useState(null);

    // const { data, isError } = getSourceConcepts(source, org);

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "display_name", headerName: "Display Name", width: 200 },
        { field: "concept_class", headerName: "Concept Class", width: 150 },
        { field: "datatype", headerName: "Datatype", width: 150 },
        { field: "source", headerName: "Source", width: 150 },
        { field: "retired", headerName: "Retired", width: 100 },
        { field: "version_created_on", headerName: "Version Created On", width: 200 },
        { field: "version_updated_on", headerName: "Version Updated On", width: 200 },
    ];
    const handleClick = (params) => {
        const rowId = params.id;
        router.push(`/orgs/${params?.row?.owner}/sources/${params?.row?.source}/concepts/${rowId}`);

    }

    const fetchConcepts = () => {
        setIsLoading(true);
        let url = `${API_BASE_URL}/orgs/${org}/sources/${source}/concepts/?limit=${rows_per_page}&page=${page}&verbose=false&includeRetired=false`
        fetch(url)
            .then((d) => {
                const conceptspagecount = d.headers.get('pages') ?? 1
                const conceptspagesize = d.headers.get('num_returned') ?? 20
                const conceptscurrentpage = d.headers.get('page_number') ?? 1
                setTotalPages(conceptspagecount ?? 1);
                setRowsPerPage(conceptspagesize ?? 20);
                setPage(conceptscurrentpage ?? 1);

                console.log('pages:', conceptspagecount, 'size:', conceptspagesize, 'current:', conceptscurrentpage);
                return d.json()
            })
            .then((data) => {
                if (data) {
                    setData(data);

                }
            })
            .catch((err) => {
                setIsError(true);
                setError(err.message);
                console.error('error::', err);
            });
        setIsLoading(false);
    };

    useEffect(() => {
        let mounted = true
        if (mounted) {
            fetchConcepts();
        }
        return () => {
            mounted = false
        }
    }, [router.query, page]);

    return (
        <>
            <Head>
                <title>MOH KNHTS | Source - {source}</title>
                <meta name="description" content="MOH KNHTS" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {isLoading ? (
                <CircularProgress />
            ) : isError ? (
                <Stack sx={{ width: "100%" }} spacing={2}>
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {error ?? "Error fetching data, please retry."}
                    </Alert>
                </Stack>
            ) : data ? (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: { xs: '100%', md: '99vw' } }}>
                    <Box sx={{ width: "100%", py: { xs: 2, md: 2 }, px: { xs: 1, md: 2 } }}>
                        <Box sx={{ bgcolor: "white", width: "100%", display: "flex", flexDirection: { xs: "column", md: "row" }, flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
                            <button
                                style={{ background: "transparent", width: "auto", border: 0, color: "#777", padding: 0 }}
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    router.back();
                                }}
                            >
                                &larr; Back
                            </button>
                            <Typography variant="h5" m={0} align="left" fontWeight={"bold"} color="text.primary" gutterBottom>
                                Source: {source}
                            </Typography>
                            <Box></Box>
                        </Box>
                        <hr />
                        <Box sx={{ flexGrow: 1, backgroundColor: "white", padding: "16px" }}>
                            <Typography variant="h6" gutterBottom> Concepts Table </Typography>
                            <div style={{ width: "100%" }}>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>#</TableCell>
                                                <TableCell sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>ID</TableCell>
                                                <TableCell sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>Display Name</TableCell>
                                                <TableCell sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>Concept Class</TableCell>
                                                <TableCell sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>Datatype</TableCell>
                                                <TableCell sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>Source</TableCell>
                                                <TableCell sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>Retired</TableCell>
                                                <TableCell sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>Version Created On</TableCell>
                                                <TableCell sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>Version Updated On</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {data.map((row, index) => (
                                                <TableRow key={row.id} onClick={() => handleClick({ id: row.id, row: row })}>
                                                    <TableCell>{index + 1}</TableCell>
                                                    <TableCell>{row.id}</TableCell>
                                                    <TableCell>{row.display_name}</TableCell>
                                                    <TableCell>{row.concept_class}</TableCell>
                                                    <TableCell>{row.datatype}</TableCell>
                                                    <TableCell>{row.source}</TableCell>
                                                    <TableCell>{row.retired}</TableCell>
                                                    <TableCell>{row.version_created_on}</TableCell>
                                                    <TableCell>{row.version_updated_on}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Pagination
                                    count={parseInt(total_pages)}
                                    page={parseInt(page)}
                                    onChange={(event, value) => {
                                        if (value === page) return;
                                        setPage(value);
                                        // fetchConcepts(pg);
                                    }}
                                />
                            </div>
                        </Box>
                    </Box>
                </Box>
            ) : null}
        </>
    );
}

export default SourceConcepts;
