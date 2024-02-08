import React, { useEffect } from 'react';
import Footer from '@/components/footer';

function HelpGuide() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//code.tidio.co/edrcjdaok4t7ssu5wqepxnr97r4jhco5.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        }
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '80px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <img
                            src="/assets/images/help.png"
                            alt="announcement Icon"
                            style={{ width: '100px', height: '100px', marginBottom: '20px' }}
                        />
                        <h1>Help and Guide</h1>
                    </div>
                    <div style={{ textAlign: 'center' }}> Under Development. Coming Soon</div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default HelpGuide;
