import React, { useEffect, useState } from "react"
import { DataGrid, GridToolbar  } from '@mui/x-data-grid'
import { useRouter } from 'next/router';
import { Alert, Typography } from "@mui/material"
import BioCard from "./userDetails"
// import Details from "./userDetails"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL|| 'http://41.89.92.186:8000/'

const columns = [
  { field: 'username', headerName: 'User Name', width: 130 },
  { field: 'url', headerName: 'URL', width: 130 },
]



export default function Home() {
    const [data, setData] = useState([])
    const router = useRouter()
    const handleRowClick = (params, event) => {
      router.push(`/user/${params.id}`);
    };
    useEffect(()=>{
        fetch(`${API_BASE_URL}/users`).then((res)=>{
            return res.json()
        })
        .then((data)=>{
            setData(data)
        })
    },[])
    return(
        <React.Fragment>
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
                onRowClick={handleRowClick}
                onRowSelectionModelChange={itm => console.log(itm)}
            />
        </React.Fragment>
    )
}