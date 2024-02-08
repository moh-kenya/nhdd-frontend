import * as React from 'react';
import { useEffect, useState } from "react"
import { Link, Box, TextField, Pagination } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

function preventDefault(event) {
    event.preventDefault();
}

export default function UsersList() {
    const [data, setData] = useState([])
    const [filteredData,setFilteredData] = React.useState("");

    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [total_pages, setTotalPages] = useState(1);
    const indexOfLastConcept = page * rowsPerPage;
    const indexOfFirstConcept = indexOfLastConcept - rowsPerPage;

    const filterUsers = (term) => {
        const filteredData = Object.values(data).filter((row) =>
            Object.values(row).some(
                (value) =>
                    typeof value === "string" && value.toLowerCase().includes(term.toLowerCase())
            ));
            
        setFilteredData(filteredData);
    }
    const fetchUsers = () => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`).then((res) => {
            return res.json()
        })
            .then((data) => {
                setData(data)
                setFilteredData(data);
            })
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <React.Fragment>
            <Title>Recent Users</Title>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField id="outlined-basic" label="Filter Users" size='small' variant="outlined" sx={{ width: '100%', maxWidth: '100%' }}
                    onChange={(e) => {
                        let term = e.target.value;
                            filterUsers(term);
                        
                    }} />
            </Box>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>User Name</TableCell>
                        <TableCell>URL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredData ? filteredData?.map((row) => (
                        <TableRow key={row?.username}>
                            <TableCell>{row.username}</TableCell>
                            <TableCell>{row.url}</TableCell>

                        </TableRow>
                    )):null}
                </TableBody>
            </Table>
            <Pagination
                count={parseInt(total_pages)}
                page={parseInt(page)}
                onChange={(event, value) => {
                     setPage(value)
                    // fetchDomainData(value)
                }}
            />
        </React.Fragment>
    );
}
