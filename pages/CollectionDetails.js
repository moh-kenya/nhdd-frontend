import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Snackbar,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Pagination,
  InputAdornment,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import { doGetSession } from "@/utilities";

const CollectionDetails = ({ collection }) => {
  const [open, setOpen] = useState(false);
  const [concepts, setConcepts] = useState([]);
  const [selectedConcepts, setSelectedConcepts] = useState([]);
  const [originalConcepts, setOriginalConcepts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const rows_per_page = 10;
  const [page, setPage] = useState(1);
  const total_pages = Math.ceil(concepts.length / rows_per_page);
  const router = useRouter();
  const { org, source, collectionId } = router.query;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const checkLoginStatus = async () => {
      const sessionData = await doGetSession();
      setIsLoggedIn(sessionData !== null);
    };

    checkLoginStatus();
  }, []);

  const fetchConcepts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/concepts/`);
      const data = await response.json();
      setConcepts(data);
      setOriginalConcepts(data);
    } catch (error) {
      console.error("Error fetching concepts:", error);
    }
  };

  const handleOpenSlide = async () => {
    setOpen(true);
    await fetchConcepts();
  };

  const handleCloseSlide = () => {
    setOpen(false);
  };

  const handleSelect = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  const handleAddSelectedConcepts = () => {
    const newlySelectedConcepts = concepts.filter((concept) =>
      selectedRows.includes(concept.id)
    );
    const updatedSelectedConcepts = [
      ...selectedConcepts,
      ...newlySelectedConcepts,
    ];
    setSelectedConcepts(updatedSelectedConcepts);
    localStorage.setItem(
      `selectedConcepts_${collectionId}`,
      JSON.stringify(updatedSelectedConcepts)
    );

    setOpen(false);
    setSelectedRows([]);
  };

  const handleSearch = () => {
    if (!searchTerm) {
      return;
    }

    const filteredConcepts = concepts.filter(
      (concept) =>
        concept.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        concept.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setConcepts(filteredConcepts);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setConcepts(originalConcepts);
  };

  const handleRemoveConcept = (id) => {
    const updatedSelectedConcepts = selectedConcepts.filter(
      (concept) => concept.id !== id
    );
    setSelectedConcepts(updatedSelectedConcepts);

    localStorage.setItem(
      `selectedConcepts_${collectionId}`,
      JSON.stringify(updatedSelectedConcepts)
    );
  };

  const formatdDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const collectionDetails = [
    { label: "ID", value: collection.short_code },
    { label: "Name", value: collection.short_name },
    { label: "Owner", value: collection.owner },
    { label: "Collection Type", value: collection.collection_type },
    {
      label: "Created At",
      value: new Date(collection.created_at).toLocaleString(),
    },
  ];

  return (
    <Box padding={2}>
      <Typography variant="h4" marginBottom={2}>
        Collection Details
      </Typography>

      {collectionDetails.map((detail, index) => (
        <Box key={index} display="flex" marginBottom={1}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "bold", marginRight: 1 }}
          >
            {detail.label}:
          </Typography>
          <Typography variant="body2">{detail.value}</Typography>
        </Box>
      ))}

      {isLoggedIn && (
        <Box marginTop={2} marginBottom={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenSlide}
            sx={{ marginRight: 1 }}
          >
            Add Concepts
          </Button>
        </Box>
      )}

      <Accordion
        sx={{ marginTop: 3 }}
        defaultExpanded={true}
        disabled={selectedConcepts.length === 0}
      >
        <AccordionSummary
          expandIcon={selectedConcepts.length > 0 ? <ExpandMoreIcon /> : null}
        >
          <Typography variant="h6">
            Concepts ({selectedConcepts.length})
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ width: "100%" }}>
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: "#D1EEF3" }}>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      #
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      ID
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      Display Name
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      Concept Class
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      Datatype
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      Source
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      Retired
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      Version Created On
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                      }}
                    >
                      Version Updated On
                    </TableCell>
                    {isLoggedIn && (
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        Actions
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {selectedConcepts.map((concept, index) => (
                    <TableRow key={concept.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{concept.id}</TableCell>
                      <TableCell>{concept.display_name}</TableCell>
                      <TableCell>{concept.concept_class}</TableCell>
                      <TableCell>{concept.datatype}</TableCell>
                      <TableCell>{concept.source}</TableCell>
                      <TableCell>{concept.retired ? "Yes" : "No"}</TableCell>
                      <TableCell>
                        {formatdDate(concept.version_created_on)}
                      </TableCell>
                      <TableCell>
                        {formatdDate(concept.version_updated_on)}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveConcept(concept.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </AccordionDetails>
      </Accordion>

      {/* Sliding Concept Box */}
      <Box
        sx={{
          position: "fixed",
          top: "64px",
          right: open ? 0 : "-70%",
          width: "70%",
          height: "calc(100% - 64px)",
          backgroundColor: "white",
          boxShadow: 3,
          zIndex: 1300,
          transition: "right 0.5s ease",
          overflowY: "auto",
        }}
      >
        <Box padding={2}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom={2}
          >
            <Typography variant="h5">Add Concept</Typography>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddSelectedConcepts}
              >
                Add Selected Concepts
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleCloseSlide}
                sx={{ marginLeft: 2 }}
              >
                Close
              </Button>
            </Box>
          </Box>
          <Box display="flex" alignItems="center" marginBottom={2}>
            <TextField
              label="Search Concepts"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ marginRight: 2, flexGrow: 1 }}
              InputProps={{
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClearSearch}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </Box>

          <TableContainer>
            <Table>
              <TableHead sx={{ backgroundColor: "#D1EEF3" }}>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    Select
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    ID
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    Display Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    Concept Class
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    Datatype
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    Source
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    Retired
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    Version Created On
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    Version Updated On
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {concepts.map((concept) => (
                  <TableRow key={concept.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedRows.includes(concept.id)}
                        onChange={() => handleSelect(concept.id)}
                      />
                    </TableCell>
                    <TableCell>{concept.id}</TableCell>
                    <TableCell>{concept.display_name}</TableCell>
                    <TableCell>{concept.concept_class}</TableCell>
                    <TableCell>{concept.datatype}</TableCell>
                    <TableCell>{concept.source}</TableCell>
                    <TableCell>{concept.retired ? "Yes" : "No"}</TableCell>
                    <TableCell>
                      {formatdDate(concept.version_created_on)}
                    </TableCell>
                    <TableCell>
                      {formatdDate(concept.version_updated_on)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Action completed successfully!"
      />
    </Box>
  );
};

export default CollectionDetails;
