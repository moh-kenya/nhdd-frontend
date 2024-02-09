
import { Box } from '@mui/material';
import '../public/assets/css/custom.css'
import NavBar from '@/components/Navbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doGetSession } from '@/utilities';
import Link from 'next/link';
import NextNProgress from 'nextjs-progressbar';


export default function App({ Component, pageProps }) {
    const router = useRouter()
    const [session, setSession] = useState(null)
    const [user, setUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const pages = [
        { name: 'About', link: '/about', protected: false },
        { name: 'Domains', link: '/orgs/MOH-KENYA/domains', protected: false },
        { name: 'Organisations', link: '/orgs', protected: false },
        { name: 'Announcements', link: '/announcements', protected: false },
        { name: 'Resources', link: '/resources', protected: false },
    ]
    const paths = router.asPath.split('/')?.filter(l => {
        // return ![null, '', 'orgs', 'domains', 'sources', 'concepts'].includes(l)
        return l !== ''
    })?.map(p => {
        // remove square brackets
        return p.replace('[', '').replace(']', '')
    })

    useEffect(() => {
        let mtd = true
        if (mtd) {
            doGetSession().then(session => {
                if (session) {
                    setSession(session)
                    setUser(session.user)
                    setIsLoggedIn(true)
                } else {
                    // setSession(null)
                    // setUser(null)
                    // setIsLoggedIn(false)

                    // TODO: if ROUTE is a protected route, redirect to login
                    // router.push('/auth/login', undefined, { unstable_skipClientCache: true })
                }
            })
        }
        return () => {
            mtd = false
        }
    }, [])

    return (
        <>
            <NextNProgress height={6} showOnShallow={true} />
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }} marginBottom={2}>
                <NavBar loggedIn={isLoggedIn} session={session} user={user} pages={pages} />
                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%' }}>
                    {/* TODO: breadcrumbs */}
                    {router.pathname === '/' ? null : <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                        <Link style={{ textDecoration: 'none', color: '#1651B6' }} href="/">Home</Link> <i style={{ margin: '0 1em' }}>/</i>
                        {paths.map((path, index) => {
                            return <Box key={index} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                                <Link
                                    style={{ textDecoration: 'none', color: '#1651B6' }}
                                    href={`/${paths.slice(0, index + 1).join('/')}`}
                                >{path.split('?')[0]} </Link>
                                {(index !== (paths?.length - 1)) && <i style={{ margin: '0 0.5em' }}>/</i>}
                            </Box>
                        })}
                    </Box>}
                </Box>
            </Box>
            <Component user={user} {...pageProps} />
        </>
    );
}
