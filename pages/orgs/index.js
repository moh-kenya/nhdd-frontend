import React from "react";
import { Box, TextField, Button, Skeleton, Stack, Alert, AlertTitle, Typography,SearchTwoTone } from "@mui/material";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { getOrganizations } from "@/pages/api/organizations";
import { Search } from "@mui/icons-material";
import Footer from '@/components/footer';

function OrgsList() {
  const router = useRouter();
  const { data, isLoading, isError, mutate } = getOrganizations();
  const columns = ["id", "name", "type", "url"];
  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) {
    return (
      <Box sx={{ pt: 0.5 }}>
        <Skeleton />
        <Skeleton width="60%" />
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

  const handleSearch = (event) => {
    event.preventDefault();
    mutate();
  };
  const filteredData = Object.values(data).filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" && value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  const handleClick = (params) =>{
    const rowId = params.id;
    router.push(`/orgs/${rowId}/sources/`);
  }
  return (
    <>
      <Head>
        <title>MOH KNHTS | Organizations</title>
        <meta name="description" content="MOH KNHTS" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box maxWidth={1280} sx={{ width: '100%', py: { xs: 2, md: 2 }, px: { xs: 1, md: 2 } }}>
                  
                </Box>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                <button style={{ background: 'transparent', width: 'auto', border: 0, color: '#777', padding: 0 }} onClick={ev => {
                            ev.preventDefault()
                            router.back()
                        }}> &larr; Back</button>
                    <Typography variant="h4" m={0} align="left" fontWeight={'bold'} color="text.primary" gutterBottom> Organisation Units </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField id="outlined-basic" label="Filter Organisation Units" size='small' variant="outlined" sx={{ width: '100%', maxWidth: 500 }}   onChange={(e) => setSearchTerm(e.target.value)}/>
                            <Button onClick={handleSearch} sx={{  borderRadius: "8px",  marginLeft: "10px",  backgroundColor: "#fff",  color: "#333",}}variant="contained"color="primary">
                            <Search />
                          </Button>   
                        </Box>
                  </Box>
      <Box my={2} sx={{ width: "100%" }}>
        <DataGrid
          rows={filteredData}
          getRowId={(row) => row.id}
          columns={columns.map((key) => {
            return {
              field: key.toLowerCase(),
              headerName: key.toUpperCase(),
              width: 200,
            };
          })}
          onRowClick={handleClick}
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
          }}
          pageSizeOptions={[25, 50, 100]}
        />
      </Box>
      <br></br>
      <Footer />
    </>
  );
}

export default OrgsList;
