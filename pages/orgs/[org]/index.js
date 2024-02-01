import React from "react";
import { Box, TextField, Button, Skeleton, Stack, Alert, AlertTitle } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { getOrganizations } from "@/pages/api/organizations";

function InstitutionsList() {
    const router = useRouter();
    const { data, isLoading, isError, mutate } = getOrganizations();
    const columns = [
      "id",
      "name",
      "type",
      "url",
    ];
  
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
  
    return (
      <>
        <Head>
          <title>MOH KNHTS | Organizations</title>
          <meta name="description" content="MOH KNHTS" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <Box my={2} sx={{ width: "100%" }}>
          <DataGrid
            rows={Object.values(data)}
            getRowId={(row) => row.id}
            columns={columns.map((key) => {
              return {
                field: key.toLowerCase(),
                headerName: key.charAt(0).toUpperCase() + key.slice(1),
                width: 200,
              };
            })}
            initialState={{
              pagination: { paginationModel: { pageSize: 25 } },
            }}
            pageSizeOptions={[25, 50, 100, 250]}
          />
        </Box>
      </>
    );
}

export default InstitutionsList;
