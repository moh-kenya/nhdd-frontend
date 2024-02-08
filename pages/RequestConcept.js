import React, { useState } from 'react';
import Box from '@mui/material/Box';
import {Stack, Button, Select, MenuItem, TextField, Typography, InputLabel, FormControl, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

function RequestConcept() {
  const [sections, setSections] = useState([]);
  const [dataType, setDataType] = useState('');

  const addSection = () => {
    setSections([...sections, { id: sections.length + 1 }]);
  };

  const deleteSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };
  const handleDataTypeChange = (event) => {
    setDataType(event.target.value);
  };
  const dataTypes = [
    'Boolean',
    'Coded',
    'Complex',
    'Date',
    'Datetime',
    'Document',
    'None',
    'Numeric',
    'Rule',
    'Structured-Numeric',
    'Text',
    'Time',
  ];
  return (
    <div>
      <Typography variant="h5" my={4} textAlign={'center'} fontWeight={'bold'} marginBottom={'5px'}>
        Request Addition of New Concepts
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'left',
          justifyContent: 'left',
          width: '70%',
          margin: 'auto',
        }}
      >
        <TextField label="Concept ID" variant="outlined" margin="normal" fullWidth required={true}/>
        <FormControl variant="outlined" fullWidth margin="normal" required={true}>
          <InputLabel id="concept-class-label">Concept Class</InputLabel>
          <Select labelId="concept-class-label" label="Concept Class">
            <MenuItem value="concept1">Concept Class 1</MenuItem>
            <MenuItem value="concept2">Concept Class 2</MenuItem>
            <MenuItem value="concept3">Concept Class 3</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Concept Name" variant="outlined" margin="normal" fullWidth required={true} />
        <FormControl variant="outlined" fullWidth margin="normal" required={true}>
          <InputLabel id="concept-datatype-label">DataType </InputLabel>
          <Select labelId="concept-datatype-label"          
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
        <TextField label="External ID" variant="outlined" margin="normal" fullWidth />
        <TextField label="Descriptions" variant="outlined" margin="normal" fullWidth required={true} />
        <Typography my={2} variant="h6" margin="normal" sx={{ textAlign: 'left' }}>
            Names & Synonyms
            <IconButton variant="contained" color="primary" size="small" sx={{ textAlign: 'right' }}onClick={addSection}>
            <AddIcon />
        </IconButton>
        </Typography>
        {sections.map((section) => (
          <Box
            key={section.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              width: '70%',
              margin: 'auto',
              marginTop: 2,
            }}
          >
           

            <Box sx={{ display: 'flex', justifyContent: 'right', width: '100%' }}>
              <FormControl variant="outlined" fullWidth sx={{ marginRight: 1 }}>
                <InputLabel id={`select-label-${section.id}`}>Locale</InputLabel>
                <Select labelId={`select-label-${section.id}`} label="Select 1">
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="sw">Swahili</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="outlined" fullWidth sx={{ marginRight: 1 }}>
                <InputLabel id={`select-label-${section.id}`}>Type</InputLabel>
                <Select labelId={`select-label-${section.id}`} label="Select 2">
                  <MenuItem value="option1">Option 1</MenuItem>
                  <MenuItem value="option2">Option 2</MenuItem>
                </Select>
              </FormControl>
              <TextField label="Name" variant="outlined" fullWidth sx={{ marginRight: 1 }} />
              <TextField label="External ID" variant="outlined"  fullWidth />           
                 <IconButton
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ textAlign: 'left' }}
                  onClick={() => deleteSection(section.id)}
                >
                  <DeleteIcon />
                </IconButton>
            </Box>


          </Box>
        ))}
        <Box>
          <Stack direction="row" spacing={10}  marginLeft={10} >
            <Button variant="contained"  endIcon={<SendIcon size='small' />}>Submit</Button>
            <Button variant="contained" href="" color='error'>
                Cancel
            </Button>
          </Stack>
        </Box>
      </Box>
    </div>
  );
}

export default RequestConcept;
