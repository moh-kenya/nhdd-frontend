import { getResource } from '@/utilities'
import { SearchTwoTone } from '@mui/icons-material'
import { Box, Button, Chip, TextField, Typography } from '@mui/material'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

function OrgDomainsList() {
  const router = useRouter()
  const { org, domain } = router.query
  const [domainData, setDomainData] = React.useState([])

  useEffect(() => {
    let mounted = true
    // call to local api
    if (mounted) {
      fetch('/api/domains/' + domain)
      .then(d => d.json()).then(data => {
        if (data) {
          setDomainData(data)
        }
      }).catch(err => {
        console.error('error::', err)
      })
    }
    return () => mounted = false
  }, [])


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
            <Typography variant="h3" m={0} align="left" fontWeight={'bold'} color="text.primary" gutterBottom> {domainData?.name} </Typography>
            <Box></Box>
            {/* <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <TextField id="outlined-basic" label="Search domains" size='small' variant="outlined" sx={{ width: '100%', maxWidth: 500 }} />
                            <Button variant="outlined" size='large' color='inherit' sx={{ ml: 1 }}> <SearchTwoTone /> </Button>
                        </Box> */}
          </Box>
          <hr />
        </Box>
        <Box maxWidth={1280} sx={{ width: '100%', p: 1, display: 'flex', flexDirection: 'column' }}>
          <pre style={{ textAlign: 'left' }}>{JSON.stringify(domainData, null, 2)}</pre>
        </Box>
      </Box>
    </>

  )
}

export default OrgDomainsList