import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  Stack,
  Button,
  Select,
  MenuItem,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  IconButton,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import { API_BASE_URL } from "./index";
import { getSources } from "@/pages/api/sources";
import { getOrganizations } from "@/pages/api/organizations";

function RequestConcept({ user }) {
  const {
    data: organisationSources,
    isLoading: isLoadingOrganizationSources,
    isError,
    mutate,
  } = getSources("MOH-KENYA");
  const [sections, setSections] = useState([]);
  const [dataType, setDataType] = useState("");
  const [organizationSource, setOrganizationSource] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { data: allOrganizations, isLoading: isLoadingOrganizations } =
    getOrganizations();

  const addSection = () => {
    setSections([...sections, { id: sections.length + 1 }]);
  };

  const deleteSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };
  const handleDataTypeChange = (event) => {
    setDataType(event.target.value);
  };

  const handleOrganizationSourceChange = (event) => {
    setOrganizationSource(event.target.value)
  }
  const dataTypes = [
    "Boolean",
    "Coded",
    "Complex",
    "Date",
    "Datetime",
    "Document",
    "None",
    "Numeric",
    "Rule",
    "Structured-Numeric",
    "Text",
    "Time",
  ];

  const conceptClasses = [
    "Test",
    "Procedure",
    "Drug",
    "Diagnosis",
    "Finding",
    "Anatomy",
    "Question",
    "LabSet",
    "MedSet",
    "ConvSet",
    "Misc",
    "Symptom",
    "Symptom/Finding",
    "Specimen",
    "Misc Order",
    "Program",
    "State",
    "Medical supply",
    "Code",
    "Radiology/Imaging Procedure",
    "Concept Class",
    "Indicator",
    "Drug form",
    "Units of Measure",
    "Frequency",
    "Pharmacologic Drug Class",
    "Workflow",
    "Organism",
    "none",
    "Products",
    "InteractSet",
  ];

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      let body = {
        parent_concept_urls: [""],
        extras: {},
        external_id: "",
        concept_class: formData.get("conceptClass"),
        datatype: formData.get("dataType"),
        url: "",
        names: [
          {
            name: formData.get("conceptName"),
            external_id: formData.get("externalId"),
            type: "",
            locale: "en",
            locale_preferred: true,
            name_type: "",
          },
        ],
        descriptions: [
          {
            description: formData.get("description"),
            external_id: formData.get("externalId"),
            type: "",
            locale: "en",
            locale_preferred: true,
            description_type: "",
          },
        ],
        parent_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      };

      const response = await fetch(
        `${API_BASE_URL}/orgs/MOH-KENYA/sources/${formData.get(
          "organizationSource"
        )}/concepts/`,
        {
          method: "POST",
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the data, please try again.");
      }

      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Typography
        variant="h5"
        my={4}
        textAlign={"center"}
        fontWeight={"bold"}
        marginBottom={"5px"}
      >
        Request Addition of New Concepts
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          justifyContent: "left",
          width: "70%",
          margin: "auto",
        }}
      >
        {success || error ? (
          <Alert severity={success ? "success" : error ? "error" : ""}>
            {success && "Concept created successfully!"}
            {error && "Failed, please retry!"}
          </Alert>
        ) : null}

        <form onSubmit={onSubmit}>
          <TextField
            label="Concept Name"
            name="conceptName"
            variant="outlined"
            margin="normal"
            fullWidth
            required={true}
          />
          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            required={true}
          >
            <InputLabel id="concept-class-label">Concept Class</InputLabel>
            <Select
              name="conceptClass"
              labelId="concept-class-label"
              label="Concept Class"
            >
              {conceptClasses.map((type, ind) => (
                <MenuItem key={ind} value="concept1">
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            required={true}
          >
            <InputLabel id="concept-datatype-label">DataType </InputLabel>
            <Select
              name="dataType"
              labelId="concept-datatype-label"
              value={dataType}
              onChange={handleDataTypeChange}
              label="DataType"
            >
              {dataTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            required={true}
          >
            <TextField
              label="Organization"
              name="organization"
              variant="outlined"
              margin="normal"
              value={"WHO"}
              fullWidth
              required={true}
            />
          </FormControl>
          <FormControl
            variant="outlined"S
            fullWidth
            margin="normal"
            required={true}
          >
            <InputLabel id="concept-sources-label">Sources </InputLabel>
            <Select
              name="organizationSource"
              labelId="concept-sources-label"
              onChange={handleOrganizationSourceChange}
              value={organizationSource}
              label="Sources"
            >
              {isLoadingOrganizationSources ? (
                <MenuItem>Loading...</MenuItem>
              ) : (
                organisationSources.map((type) => (
                  <MenuItem key={type.id} value={type.name}>
                    {type.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>
          <TextField
            name="externalId"
            label="External ID"
            variant="outlined"
            margin="normal"
            fullWidth
          />
          <TextField
            name="description"
            label="Descriptions"
            variant="outlined"
            margin="normal"
            fullWidth
            required={true}
            multiline
            rows={3}
          />
          <Typography
            my={2}
            variant="h6"
            margin="normal"
            sx={{ textAlign: "left" }}
          >
            Names & Synonyms
            <IconButton
              variant="contained"
              color="primary"
              size="small"
              sx={{ textAlign: "right" }}
              onClick={addSection}
            >
              <AddIcon />
            </IconButton>
          </Typography>
          {sections.map((section) => (
            <Box
              key={section.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                width: "70%",
                margin: "auto",
                marginTop: 2,
              }}
            >
              <Box
                sx={{ display: "flex", justifyContent: "right", width: "100%" }}
              >
                <FormControl
                  variant="outlined"
                  fullWidth
                  sx={{ marginRight: 1 }}
                >
                  <InputLabel id={`select-label-${section.id}`}>
                    Locale
                  </InputLabel>
                  <Select
                    name="locale"
                    labelId={`select-label-${section.id}`}
                    label="Select 1"
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="sw">Swahili</MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  variant="outlined"
                  fullWidth
                  sx={{ marginRight: 1 }}
                >
                  <InputLabel id={`select-label-${section.id}`}>
                    Type
                  </InputLabel>
                  <Select
                    name="type"
                    labelId={`select-label-${section.id}`}
                    label="Select 2"
                  >
                    <MenuItem value="option1">Option 1</MenuItem>
                    <MenuItem value="option2">Option 2</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Name"
                  name="synonymName"
                  variant="outlined"
                  fullWidth
                  sx={{ marginRight: 1 }}
                />
                <TextField
                  name="externalId"
                  label="External ID"
                  variant="outlined"
                  fullWidth
                />
                <IconButton
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ textAlign: "left" }}
                  onClick={() => deleteSection(section.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              px: 2,
              gap: 3,
            }}
          >
            <Button
              variant="contained"
              type="submit"
              disabled={isLoading}
              endIcon={<SendIcon size="small" />}
            >
              {isLoading ? "Loading..." : "Submit"}
            </Button>
            <Button variant="contained" href="" color="error">
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
}

export default RequestConcept;
