import Link from 'next/link';
import React from 'react';
import Footer from '@/components/footer';
import Head from 'next/head';

function ResourcesKnhts() {
    return (
        <>
            <Head>
                <title>Resources</title>
                <meta name="description" content="Resources" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: '40px', borderRadius: '80px', marginBottom: '80px' }}>
                <div style={{ textAlign: 'left', maxWidth: '1000px' }}>
                    <h1 style={{ color: '#1651B6', textAlign: 'center' }}>The Kenya National Health Terminology Service Resources</h1>
                    <p style={{ fontSize: '1.2em', lineHeight: '1.5' }}> These are a list of resources. Click on each to download: </p>
                    <ul style={{ fontSize: '1.2em', lineHeight: '1.5', listStyle: 'circle', paddingLeft: '30px', textAlign: 'left' }}>
                        <li style={{ marginBottom: '20px' }}><Link href="/api/file-download/?filename=kenya-national-ehealth-policy-2016-2030.pdf" download>Kenya National eHealth Policy 2016-2030 </Link></li>
                        <li style={{ marginBottom: '20px' }}><Link href="/api/file-download/?filename=Kenya Health Sector Strategic Plan 2018-23.pdf" download>Kenya Health Sector Strategic Plan 2018-23 </Link></li>
                        <li style={{ marginBottom: '20px' }}><Link href="/api/file-download/?filename=Digital Health Act 15 of 2023.pdf" download>Digital Health Act 15 of 2023 </Link></li>
                        <li style={{ marginBottom: '20px' }}><Link href="/api/file-download/?filename=DRAFT KE-NHDD Governance Framework - Dec 5 2023.pdf" download>DRAFT KE-NHDD Governance Framework - Dec 5 2023 </Link></li>
                        <li style={{ marginBottom: '20px' }}><Link href="/api/file-download/?filename=DRAFT Kenya HIS Certification Framework - Draft 06FEB2017_KJO-edits_clean (3).pdf" download>DRAFT Kenya HIS Certification Framework - Draft 06FEB2017_KJO-edits_clean </Link></li>
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ResourcesKnhts;
