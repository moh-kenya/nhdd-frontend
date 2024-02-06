import React from 'react';

function AboutKnhts() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
            <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '80px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ color: '#1651B6' }}>About the Kenya National Health Terminology Service (KNHTS)</h1>
                    
                        <p style={{ fontSize: '1.2em', lineHeight: '1.5' }}>
                        The Ministry of Health has established and implemented a National Terminology Service that will provide a standardized and consistent set of 
                        health terms, definitions, and concepts that all stakeholders can use to enable the realization of health information exchange and 
                        promote efficiency across systems to communicate effectively, accurately, and unambiguously. This will provide for the collaborative management, 
                        publication, versioning, and distribution of standardized data dictionaries and other relevant content, w
                        hich the health sector stakeholders will access and utilize the digital health systems they deploy at various levels of the health system. 
                        The National Terminology Services will be implemented across the health sector and accessed by both state and non-state actors.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutKnhts;
