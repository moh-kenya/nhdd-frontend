import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'sender',
    headerName: 'Sender',
    width: 150,
    editable: true,
  },
  {
    field: 'subject',
    headerName: 'Subject',
    width: 150,
    editable: true,
  },
  {
    field: 'time',
    headerName: 'Time',
    type: 'time',
    width: 110,
    editable: true,
  },
 
];

const rows = [
  { id: 1, sender: 'Snow', subject: 'Jon', time: 14 },
  { id: 2, sender: 'Lannister', subject: 'Cersei', time: 31 },
  { id: 3, sender: 'Lannister', subject: 'Jaime', time: 31 },
  { id: 4, sender: 'Stark', subject: 'Arya', time: 11 },
  { id: 5, sender: 'Targaryen', subject: 'Daenerys', time: null },
  { id: 6, sender: 'Melisandre', subject: null, time: 150 },
  { id: 7, sender: 'Clifford', subject: 'Ferrara', time: 44 },
  { id: 8, sender: 'Frances', subject: 'Rossini', time: 36 },
  { id: 9, sender: 'Roxie', subject: 'Harvey', time: 65 },
];

export default function Inbox() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}