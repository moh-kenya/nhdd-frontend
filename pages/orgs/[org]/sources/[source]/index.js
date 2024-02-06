import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { getSourceConcepts } from "../../../../../pages/api/sources";

function SourceConcepts() {
  const router = useRouter();
  const { source } = router.query;
  const [isLoading, setIsLoading] = useState(true);

  const { data, isError } = getSourceConcepts(source);

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

  useEffect(() => {
    if (data?.length>0) {
    setIsLoading(false)
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
         <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Error fetching data, please retry.
        </Alert>
      </Stack>
      ) : data ? (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
              <Typography variant="h6" gutterBottom>
                Concepts Table
              </Typography>
              <div style={{  width: "100%" }}>
                <DataGrid rows={data} columns={columns} pageSize={10} />
              </div>
            </Box>
          </Box>
        </Box>
      ) : null}
    </>
  );
}

export default SourceConcepts;
