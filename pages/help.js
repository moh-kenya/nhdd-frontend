import React, { useEffect } from 'react';
import Footer from '@/components/footer';
import Head from 'next/head';

function HelpGuide() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//code.tidio.co/edrcjdaok4t7ssu5wqepxnr97r4jhco5.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <>
            <Head>
                <title>Help and Guide</title>
                <meta name="description" content="HelpandGuide" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', padding: '0 20px' }}>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '20px', maxWidth: '800px', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            <img
                                src="/assets/images/help.png"
                                alt="announcement Icon"
                                style={{ width: '100px', height: '100px', marginRight: '20px' }}
                            />
                            <div style={{ textAlign: 'center' }}>
                                <h1 style={{ fontSize: '30px', marginBottom: '10px' }}>Help and Guide</h1>
                                <p style={{ fontSize: '16px' }}>Under Development. Coming Soon</p>
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

export default HelpGuide;
