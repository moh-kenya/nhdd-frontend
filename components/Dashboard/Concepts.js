import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2023',
    'Malaria with mentioned HIV',
    'Diagnosis',
    'SNOMED-4355',
    "WHO",
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'Diagnosis',
    'SNOMED-9993',
    "WHO",
  ),
  createData(
    2,
     '16 Mar, 2019',
      'Tom Scholz', 
      'Diagnosis',
       'MAKON', 
       "WHO"
       ),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Diagnosis',
    'ICD-11',
    "WHO",
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Diagnosis',
    'SNOMED-3663',
    "WHO",
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Recent Concepts</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date Created</TableCell>
            <TableCell>Concept Name</TableCell>
            <TableCell>Class</TableCell>
            <TableCell>Mapping</TableCell>
            <TableCell align="right">Source</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{`${row.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more concepts
      </Link>
    </React.Fragment>
  );
}