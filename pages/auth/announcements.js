import React from 'react';

function KnightsAnnouncements() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
            <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '80px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src="/assets/images/announcement.png" 
                        alt="announcement Icon"
                        style={{ width: '100px', height: '100px', marginRight: '20px' }}
                    />
                    <div>
                        <h1>Announcements</h1>
                        <br></br>
                        <p>The Kenya National Health Terminology Service will be launched in February 2024</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default KnightsAnnouncements;
