import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Snackbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const CreateCollectionModal = ({ onCollectionCreated }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [collectionDetails, setCollectionDetails] = useState({
    short_code: "",
    short_name: "",
    full_name: "",
    description: "",
    collection_type: "",
    mnemonic: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

    if (
      !collectionDetails.short_code ||
      !collectionDetails.short_name ||
      !collectionDetails.full_name ||
      !collectionDetails.description ||
      !collectionDetails.collection_type ||
      !collectionDetails.mnemonic
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    const newCollection = {
      id: collectionDetails.short_code,
      name: collectionDetails.short_name,
      mnemonic: collectionDetails.mnemonic,
      full_name: collectionDetails.full_name,
      description: collectionDetails.description,
      collection_type: collectionDetails.collection_type,
    };

    try {
      const token = Cookies.get("token");
      if (!token) {
        // handle token absence
      }
      const response = await fetch(`${API_BASE_URL}/user/collections/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newCollection),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Collection created:", data);

        onCollectionCreated(data);

        setSnackbarOpen(true);
        handleClose();
      } else {
        const responseData = await response.json();
        throw new Error(JSON.stringify(responseData));
      }
    } catch (error) {
      console.error("Error creating collection:", error);
      alert("There was an error creating the collection. Please try again.");
    }
  };

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create Collection
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Collection</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Collection Details</Typography>
          <TextField
            label="Short Code"
            fullWidth
            margin="dense"
            value={collectionDetails.short_code}
            onChange={(e) =>
              setCollectionDetails({
                ...collectionDetails,
                short_code: e.target.value,
              })
            }
            required
          />
          <TextField
            label="Short Name"
            fullWidth
            margin="dense"
            value={collectionDetails.short_name}
            onChange={(e) =>
              setCollectionDetails({
                ...collectionDetails,
                short_name: e.target.value,
              })
            }
            required
          />
          <TextField
            label="Full Name"
            fullWidth
            margin="dense"
            value={collectionDetails.full_name}
            onChange={(e) =>
              setCollectionDetails({
                ...collectionDetails,
                full_name: e.target.value,
              })
            }
            required
          />
          <TextField
            label="Description"
            fullWidth
            margin="dense"
            value={collectionDetails.description}
            onChange={(e) =>
              setCollectionDetails({
                ...collectionDetails,
                description: e.target.value,
              })
            }
            required
          />
          <FormControl fullWidth margin="dense" required>
            <InputLabel>Collection Type</InputLabel>
            <Select
              value={collectionDetails.collection_type}
              onChange={(e) =>
                setCollectionDetails({
                  ...collectionDetails,
                  collection_type: e.target.value,
                })
              }
            >
              <MenuItem value="Dictionary">Dictionary</MenuItem>
              <MenuItem value="Indicator Registry">Indicator Registry</MenuItem>
              <MenuItem value="Interface Terminology">
                Interface Terminology
              </MenuItem>
              <MenuItem value="Subset">Subset</MenuItem>
              <MenuItem value="Value Set">Value Set</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Mnemonic"
            fullWidth
            margin="dense"
            value={collectionDetails.mnemonic}
            onChange={(e) =>
              setCollectionDetails({
                ...collectionDetails,
                mnemonic: e.target.value,
              })
            }
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Collection created successfully!"
      />
    </Box>
  );
};

export default CreateCollectionModal;
