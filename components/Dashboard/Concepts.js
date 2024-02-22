import * as React from 'react';
import { useEffect, useState } from "react"
import Title from './Title';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid'
import { API_BASE_URL } from '@/pages';

const columns = [
    { field: 'username', headerName: 'User Name', width: 130 },
    { field: 'url', headerName: 'URL', width: 130 },
  ];
export default function UsersList() {
    const [data, setData] = useState([])
    const [filteredData,setFilteredData] = React.useState("");
   
    const fetchUsers = () => {
        fetch(`${API_BASE_URL}/users`).then((res) => {
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
            <DataGrid 
                {...data}  
                getRowId={(row) => row.username}
                rows={data}
                columns={columns}
                initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                  },
                }}
            />
        </React.Fragment>
    );
}
