import React from 'react';

function knowledgeBase() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
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
            <div style={{ position: 'absolute', bottom: '10px', right: '10px', display: 'flex', gap: '10px' }}>
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '5px' }}>
                    <a href="/auth/resources">Resources</a>
                </div>
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '5px' }}>
                    <a href="/auth/knowledgebase">Knowledge base</a>
                </div>
                <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '5px' }}>
                    <a href="/auth/helpGuide">Help & Guides</a>
                </div>
            </div>
        </div>
    );
}

export default knowledgeBase;
