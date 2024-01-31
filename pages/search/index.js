import { Box, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/router'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

function SearchResults() {
    const router = useRouter()

    const searchResults = [
        {"id": 1, "type": "concept", "name": "Malaria", "description": "Malaria is a disease caused by a parasite. The parasite is transmitted to humans through the bites of infected mosquitoes. People who have malaria usually feel very sick, with a high fever and shaking chills.", "domain": "Diagnostics", "subdomain": "Laboratory", "institution": "KEMRI"},
        {"id": 2, "type": "concept", "name": "HIV", "description": "HIV stands for human immunodeficiency virus. It harms your immune system by destroying the white blood cells that fight infection. This puts you at risk for serious infections and certain cancers. AIDS stands for acquired immunodeficiency syndrome. It is the final stage of infection with HIV.", "domain": "Diagnostics", "subdomain": "Laboratory", "institution": "KEMRI"},
        {"id": 3, "type": "domain", "name": "Diagnostics", "description": "Diagnostics is the identification of the nature and cause of a certain phenomenon. Diagnosis is used in many different disciplines with variations in the use of logic, analytics, and experience to determine \"cause and effect\".", "institution": "KEMRI"},
        {"id": 4, "type": "domain", "name": "Products & Technologies", "description": "Products & Technologies is the identification of the nature and cause of a certain phenomenon. Diagnosis is used in many different disciplines with variations in the use of logic, analytics, and experience to determine \"cause and effect\".", "institution": "KEMRI"},
        {"id": 5, "type": "domain", "name": "Investigations", "description": "Investigations is the identification of the nature and cause of a certain phenomenon. Diagnosis is used in many different disciplines with variations in the use of logic, analytics, and experience to determine \"cause and effect\".", "institution": "KEMRI"},
        {"id": 6, "type": "institution", "name": "KEMRI", "description": "KEMRI is the national medical research institute in Kenya, carrying out health research in Kenya. It is situated in Nairobi."},
        {"id": 7, "type": "institution", "name": "Vihiga County", "description": "Vihiga County is a county in the former Western Province of Kenya whose headquarters are in Mbale, the largest town in the county. The county has a population of 554,622 (2009 census) and an area of 563 km². It was split from Kakamega County in 1990."},
    ]
    return (
        <>
            <Head>
                <title>MOH KNHTS | Search</title>
                <meta name="description" content="MOH KNHTS" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box sx={{ width: '100%' }}>
                <TextField sx={{ flexGrow: 1, backgroundColor: '#f0fffa', borderRadius: '8px', width: '100%' }} id="hero-search" label="Search any concept, institution, domain, sub-domain etc." variant="outlined" color={"info"} />
            </Box>
            
            <Box my={2} sx={{ width: '100%' }}>
                <DataGrid
                    rows={Object.values(searchResults)}
                    columns={Object.keys(searchResults[0]).map((key) => {
                        return { 
                            field: key,
                            headerName: key.charAt(0).toUpperCase() + key.slice(1),
                            width: 200
                        }
                    })}
                    initialState={{
                        pagination: { pageSize: 5 }
                    }}
                    onRowClick={(row) => {
                        // TODO: go to the resource's page
                        router.push('/'+row.row.type+'/'+row.row.id)
                    }}
                />
            </Box>
        </>

    )
}

export default SearchResults