import React from 'react';
import Footer from '@/components/footer';
import Head from 'next/head';

function KnightsAnnouncements() {
    return (
        <>
            <Head>
                <title>Announcements</title>
                <meta name="description" content="Help and Guide" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
                    <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '80px', maxWidth: '800px', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img
                                src="/assets/images/announcement.png"
                                alt="announcement Icon"
                                style={{ width: '100px', height: '100px', marginRight: '20px' }}
                            />
                            <div>
                                <h1>Announcements</h1>
                                <br />
                                <p>The Kenya National Health Terminology Service will be launched in Early March 2024</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}

export default KnightsAnnouncements;
