import React, { useEffect } from 'react';
import Footer from '@/components/footer';
import Head from 'next/head';

function KnightsAnnouncements() {

    return (
        <>
            <Head>
                <title>Announcements</title>
                <meta name="description" content="Announcements" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', padding: '0 20px' }}>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: '', marginTop: '50px' }}>
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '20px', maxWidth: '800px', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <img
                                src="/assets/images/announcement.png"
                                alt="announcement Icon"
                                style={{ width: '100px', height: '100px', marginBottom: '20px' }}
                            />
                            <div style={{ textAlign: 'center' }}>
                                <h1 style={{ fontSize: '30px', marginBottom: '10px' }}>Announcements</h1>
                                <p style={{ fontSize: '16px' }}>The Kenya National Health Terminology Service will be launched in Early March 2024</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default KnightsAnnouncements;
