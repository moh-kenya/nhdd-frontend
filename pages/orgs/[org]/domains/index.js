import { getResource } from '@/utilities'
import Image from "next/image";
import { SearchTwoTone } from '@mui/icons-material'
import { Box, Button, Chip, TextField, Typography } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

function OrgDomainsList() {
    const router = useRouter()
    const { org } = router.query
    const [orgDomains, setOrgDomains] = React.useState([])

    useEffect(() => {
        let mounted = true
        // call to local api
        if (mounted) {
            fetch('/api/domains').then(d => d.json()).then(data => {
                if (data) {
                    setOrgDomains(data)
                }
            }).catch(err => {
                console.error('error::', err)
            })
        }
        return () => mounted = false
    }, [router.query])


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
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField id="outlined-basic" label="Search domains" size='small' variant="outlined" sx={{ width: '100%', maxWidth: 500 }} />
                            <Button variant="outlined" size='large' color='inherit' sx={{ ml: 1 }}> <SearchTwoTone /> </Button>
                        </Box>
                    </Box>
                    <hr />
                </Box>
                <Box maxWidth={1280} sx={{ width: '100%', p: 1, display: 'flex', flexDirection: 'column' }}>
                    {orgDomains.map((domain, index) => {
                        return <Box key={domain.id} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 1, my: 2, border: '1px solid #abc', p: 2, borderRadius: 3 }}>

                            <Box sx={{ marginRight: 2 }}>
                                <Image
                                    src={"/assets/images/" + domain.icon + ".png"}
                                    alt={domain.name}
                                    width={50}
                                    height={50}
                                />
                            </Box>

                            <Link href={`/orgs/${org}/domains/${domain.id}`} style={{ textDecoration: 'none', color: '#1651B6', display: 'flex', alignItems: 'center' }} title={domain.name}>
                                <Typography variant="h5" m={0} align="left" fontWeight={'semibold'} color="text.primary" sx={{ ":hover": { color: '#1651B6', textDecoration: 'underline' } }} gutterBottom> {domain.name} </Typography>
                            </Link>

                            {domain.sources_data?.filter(d => { return d && JSON.stringify(d) != '[]' })?.length > 0 ?
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, width: '100%', fontSize: '0.8em' }}>
                                    <span style={{ fontWeight: '500' }}>Source(s):</span> {domain.sources_data.map((src, index2) => {
                                        return <span key={'i' + index2} className='text-sky-800'>{src?.name || ''}</span>
                                    })}
                                </Box> :
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, width: '100%', fontSize: '0.8em' }}>
                                    <span style={{ fontWeight: '500' }}>&nbsp;</span>
                                </Box>
                            }
                        </Box>
                    })}
                </Box>

            </Box>
        </>

    )
}

export default OrgDomainsList