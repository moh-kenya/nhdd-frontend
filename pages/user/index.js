import React from 'react'
import Dashboard from '@/components/Dashboard'
import Head from 'next/head'
// Authenticated user landing page
function UserLanding() {
    return (
        <>

            <Head>
                <title>MOH KNHTS | Dashboard</title>
                <meta name="description" content="EPT" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Dashboard />
        </>
    )
}

export default UserLanding