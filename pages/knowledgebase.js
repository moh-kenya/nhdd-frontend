import React from 'react';
import Footer from '@/components/footer';

function KnowledgeBase() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '80px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <img
                            src="/assets/images/faq.png"
                            alt="F.A.Q Icon"
                            style={{ width: '100px', height: '100px', marginBottom: '20px' }}
                        />
                        <h1>Knowledge Base</h1>
                    </div>
                    <div style={{ textAlign: 'center' }}> Under Development. Coming Soon</div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default KnowledgeBase;
