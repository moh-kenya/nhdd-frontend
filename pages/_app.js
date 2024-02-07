
import { Box } from '@mui/material';
import '../public/assets/css/custom.css'
import NavBar from '@/components/Navbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doGetSession } from '@/utilities';

export default function App({ Component, pageProps }) {
    const router = useRouter()
    const [session, setSession] = useState(null)
    const [user, setUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const pages = [
        { name: 'About', link: '/auth/about', protected: false },
        { name: 'Domains', link: '/orgs/MOH-KENYA/domains', protected: false },
        { name: 'Organisations', link: '/orgs', protected: false },
        { name: 'Announcements', link: '/auth/announcements', protected: false },
        { name: 'Resources', link: '/auth/resources', protected: false },
    ]

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
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }} marginBottom={2}>
                <NavBar loggedIn={isLoggedIn} session={session} user={user} pages={pages} />
                {/* TODO: breadcrumbs */}
            </Box>
            <Component {...pageProps} />
        </>
    );
}
