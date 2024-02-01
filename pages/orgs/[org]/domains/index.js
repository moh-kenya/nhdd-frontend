import { SearchTwoTone } from '@mui/icons-material'
import { Box, Button, Chip, TextField, Typography } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

function OrgDomainsList() {
    const router = useRouter()
    const { org } = router.query

    const orgDomains = [
        { "id": "diagnostics", "name": "Diagnostic Information", "icon": "microscope", "subdomains": [{ "id": "01", "name": "Certain infectious or parasitic diseases" }, { "id": "02", "name": "Neoplasms" }, { "id": "03", "name": "Diseases of the blood or blood-forming organs" }, { "id": "04", "name": "Diseases of the immune system" }, { "id": "05", "name": "Endocrine, nutritional or metabolic diseases" }, { "id": "06", "name": "Mental, behavioural or neurodevelopmental disorders" }, { "id": "07", "name": "Sleep-wake disorders" }, { "id": "08", "name": "Diseases of the nervous system" }, { "id": "09", "name": "Diseases of the visual system" }, { "id": "10", "name": "Diseases of the ear or mastoid process" }, { "id": "11", "name": "Diseases of the circulatory system" }, { "id": "12", "name": "Diseases of the respiratory system" }, { "id": "13", "name": "Diseases of the digestive system" }, { "id": "14", "name": "Diseases of the skin" }, { "id": "15", "name": "Diseases of the musculoskeletal system or connective tissue" }, { "id": "16", "name": "Diseases of the genitourinary system" }, { "id": "17", "name": "Conditions related to sexual health" }, { "id": "18", "name": "Pregnancy, childbirth or the puerperium" }, { "id": "19", "name": "Certain conditions originating in the perinatal period" }, { "id": "20", "name": "Developmental anomalies" }, { "id": "21", "name": "Symptoms, signs or clinical findings, not elsewhere classified" }, { "id": "22", "name": "Injury, poisoning or certain other consequences of external causes" }, { "id": "23", "name": "External causes of morbidity or mortality" }, { "id": "24", "name": "Factors influencing health status or contact with health services" }, { "id": "25", "name": "Codes for special purposes" }, { "id": "26", "name": "Supplementary Chapter Traditional Medicine Conditions - Module I" }, { "id": "V", "name": "Supplementary section for functioning assessment" }, { "id": "X", "name": "Extension Codes" }] }, { "id": "products-technologies", "name": "Products & Technologies", "icon": "devices", "subdomains": [] }, { "id": "investigations", "name": "Investigations", "icon": "stethoscope", "subdomains": [] }, { "id": "procedures-services", "name": "Procedures & Services", "icon": "syringe", "subdomains": [] }, { "id": "billing-claims", "name": "Billing & eClaims Management", "icon": "finance", "subdomains": [] }, { "id": "hrh", "name": "Human Resources for Health", "icon": "doctor", "subdomains": [] }, { "id": "devices-infra", "name": "Devices & Infrastructure", "icon": "devices", "subdomains": [] }, { "id": "supply-chain", "name": "Supply Chain Management", "icon": "medstore", "subdomains": [] }
    ]


    return (
        <>
            <Head>
                <title>MOH KNHTS | {org}</title>
                <meta name="description" content="MOH KNHTS" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box maxWidth={1280} sx={{ width: '100%', py: { xs: 2, md: 2 }, px: { xs: 1, md: 2 } }}>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                        <button style={{ background: 'transparent', width: 'auto', border: 0, color: '#777', padding: 0 }} onClick={ev => {
                            ev.preventDefault()
                            router.back()
                        }}> &larr; Back</button>
                        <Typography variant="h3" m={0} align="left" fontWeight={'bold'} color="text.primary" gutterBottom> Domains </Typography>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <TextField id="outlined-basic" label="Search domains" size='small' variant="outlined" sx={{ width: '100%', maxWidth: 500 }} />
                            <Button variant="outlined" size='large' color='inherit' sx={{ ml: 1 }}> <SearchTwoTone /> </Button>
                        </Box>
                    </Box>
                    <hr />
                </Box>
                <Box maxWidth={1280} sx={{ width: '100%', p: 1, display: 'flex', flexDirection: 'column' }}>
                    {orgDomains.map((domain, index) => {
                        return <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'left', gap: 1, my: 2, border: '1px solid #abc', p: 2, borderRadius: 3 }}>
                            <Link href={`/orgs/${org}/domains/${domain.id}`} style={{ textDecoration: 'none', color: '#1651B6', display: 'flex', width: '100%' }} title={domain.name}>
                                <Typography variant="h5" m={0} align="left" fontWeight={'semibold'} color="text.primary" sx={{ width: '100%', ":hover": { color: '#1651B6', textDecoration: 'underline' } }} gutterBottom> {domain.name} </Typography>
                            </Link>
                            {domain.subdomains?.length > 0 ? <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, width: '100%', fontSize: '0.8em' }}>
                                <span style={{ fontWeight: '500' }}>Subdomains:</span> {domain.subdomains.slice(0, 11).map((subdomain, index2) => {
                                    return <Link key={"s-" + index2} href={`/orgs/${org}/domains/${domain.id}/subdomains/${subdomain.id}`} style={{ textDecoration: 'underline', textDecorationColor: '#1651B6', margin: '0 5px' }} title={subdomain.name} className='text-sky-800'> {subdomain.name} </Link>
                                })}
                                <span>&hellip;</span>
                            </Box> : <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, width: '100%', fontSize: '0.8em' }}>
                                <span style={{ fontWeight: '500' }}>Subdomains</span>: None
                            </Box>}
                        </Box>
                    })}
                </Box>
            </Box>
        </>

    )
}

export default OrgDomainsList