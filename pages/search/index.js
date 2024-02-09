import { Box, TextField, Button, Skeleton, Stack, Alert, AlertTitle,Typography } from "@mui/material";
import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import CircularProgress from '@mui/material/CircularProgress';
import { useSearchParams } from "next/navigation";
import { searchConcepts } from "../api/search";
import { useState } from "react";
import { Search } from "@mui/icons-material";

function SearchResults() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get("q");
    const owner = searchParams.get("owner") ?? null;
    const source = searchParams.get("source") ?? null;
    const [searchTerm, setSearchTerm] = useState("");
    const { data, isLoading, isError, mutate } = searchConcepts(search, owner, source);

    const handleSearch = (event) => {
       event.preventDefault();
        mutate();
    };

    const columns = [
        "id",
        "display_name",
        "concept_class",
        "datatype",
        "source",
        "retired",
        "version_created_on",
        "version_updated_on",
    ];

    if (isLoading) {
        return (
            <Box sx={{ width: '100%', height: '96vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (isError) {
        return (
            <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Error fetching data, please retry.
                </Alert>
            </Stack>
        );
    }

    const filteredData = Object.values(data).filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ) 


    return (
        <>
            <Head>
                <title>MOH KNHTS | Search</title>
                <meta name="description" content="MOH KNHTS" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box>
            <Typography variant="h5" m={0} align="left" fontWeight={'bold'} color="text.primary" gutterBottom> Search results for {search} {(owner && source) && ` in ${owner}/${source}` } </Typography>
            </Box>
            <Box width={"100%"} sx={{ display: "flex" }}>
                <TextField
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{
                        flexGrow: 1,
                        backgroundColor: "#fcfcfc",
                        borderRadius: "8px",
                    }}
                    id="searchTerm"
                    name="searchTerm"
                    label="Filter Searched Concepts"
                    variant="outlined"
                    color={"info"}
                />
                <Button
                    onClick={handleSearch}
                    sx={{
                        borderRadius: "8px",
                        marginLeft: "10px",
                        backgroundColor: "#fff",
                        color: "#333",
                    }}
                    variant="contained"
                    color="primary"
                >
                    <Search />
                </Button>
            </Box>

            <Box my={2} sx={{ width: "100%" }}>
                <DataGrid
                    rows={Object.values(filteredData)}
                    getRowId={(row) => row.uuid}
                    columns={columns.map((key) => {
                        return {
                            field: key.toLowerCase(),
                            headerName: key
                                .replace(/_/g, " ") // Replace underscores with spaces
                                .split(" ")
                                .map((word) => word.toUpperCase())
                                .join(" "),
                            width: 200,
                            valueGetter: (params) => {
                                // Format date if the key is 'version_created_on' or 'version_updated_on'
                                if (
                                    key === "version_created_on" ||
                                    key === "version_updated_on"
                                ) {
                                    const rawDate = params.row[key];
                                    return rawDate
                                        ? new Date(rawDate).toISOString().split("T")[0]
                                        : "";
                                }

                                return params.row[key];
                            },
                        };
                    })}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 25 } },
                    }}
                    pageSizeOptions={[25, 50, 100]}
                    onRowClick={(row) => {
                        // TODO: go to the resource's page
                        router.push({ pathname: `/orgs/${row.row.owner}/sources/${row.row.source}/concepts/${row.row.id} ` });
                    }}
                />
            </Box>
        </>
    );
}

export default SearchResults;
