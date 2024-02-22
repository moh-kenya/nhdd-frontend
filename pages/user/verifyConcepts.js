import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import {
  Stack,
  Button,
  Chip,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import SendIcon from "@mui/icons-material/Send";

const VerifyConceptsComponent = () => {
  const [open, setOpen] = useState(false);
  const [conceptName, setConceptName] = useState("");
  const [conceptClass, setConceptClass] = useState("");
  const [dataType, setDataType] = useState("");

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "concept",
      headerName: "Concept",
      width: 150,
      editable: true,
    },
    {
      field: "conceptClass",
      headerName: "Concept Class",
      width: 150,
      editable: true,
    },
    {
      field: "dataType",
      headerName: "Data type",
      width: 150,
      editable: true,
    },
    {
      field: "organisation",
      headerName: "Organization",
      width: 150,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: true,
      renderCell: (params) => {
        return <Chip label={params.value} color="warning" variant="outlined" />;
      },
    },
    {
      field: "fullName",
      headerName: "Concept class",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.concept || ""} ${params.row.organisation || ""}`,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = (e) => {
          const currentRow = params.row;
          return handleOpenModal(params);
        };
        return (
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="success"
              size="small"
              onClick={onClick}
            >
              Approve
            </Button>
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={onClick}
            >
              Reject
            </Button>
          </Stack>
        );
      },
    },
  ];

  const rows = [
    {
      id: 1,
      organisation: "Snow",
      concept: "Jon",
      conceptClass: "Misc",
      dataType: "Text",
      status: "Requested",
    },
    {
      id: 2,
      organisation: "Lannister",
      concept: "Cersei",
      status: "Requested",
    },
    {
      id: 3,
      organisation: "Lannister",
      concept: "Jaime",
      conceptClass: "Misc",
      dataType: "Text",
      status: "Requested",
    },
    {
      id: 4,
      organisation: "Stark",
      concept: "Arya",
      conceptClass: "Misc",
      dataType: "Text",
      status: "Requested",
    },
    {
      id: 5,
      organisation: "Targaryen",
      concept: "Daenerys",
      conceptClass: "Misc",
      dataType: "Text",
      status: "Requested",
    },
    { id: 6, organisation: "Melisandre", concept: null, status: "Requested" },
    {
      id: 7,
      organisation: "Clifford",
      concept: "Ferrara",
      conceptClass: "Misc",
      dataType: "Text",
      status: "Requested",
    },
    {
      id: 8,
      organisation: "Frances",
      concept: "Rossini",
      conceptClass: "Misc",
      dataType: "Text",
      status: "Requested",
    },
    {
      id: 9,
      organisation: "Roxie",
      concept: "Harvey",
      conceptClass: "Misc",
      dataType: "Text",
      status: "Requested",
    },
  ];

  const handleOpenModal = (params) => {
    setOpen(true);
    setConceptName(params.row?.concept);
    setConceptClass(params.row?.conceptClass);
    setDataType(params.row?.dataType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        onCellClick={(data) => {
          if (data.field === "__check__") {
            handleOpenModal(data)
          }
        }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pstatusSize: 5,
            },
          },
        }}
        pstatusSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
            <Button onClick={handleClose} style={{ float: "right" }}>
              <CloseOutlined />
            </Button>
            <h2>{conceptName} concept details</h2>


          <TextField
            value={conceptName}
            variant="outlined"
            margin="normal"
            fullWidth
            required={true}
          />
          <TextField
            value={conceptClass}
            variant="outlined"
            margin="normal"
            fullWidth
            required={true}
          />
          <TextField
            value={dataType}
            variant="outlined"
            margin="normal"
            fullWidth
            required={true}
          />
          <Stack
            direction="row"
            justifyContent={"center"}
            spacing={10}
            marginTop={4}
          >
            <Button onClick={handleOpenModal} variant="contained" endIcon={<SendIcon size="small" />}>
              Submit
            </Button>
            <Button
              variant="contained"
              href=""
              color="error"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
};

export default VerifyConceptsComponent;
