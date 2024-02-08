import Link from 'next/link';
import React from 'react';

function ResourcesKnhts() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
            <div>
                <h1 style={{ color: '#1651B6' }}>The Kenya National Health Terminology Service Resources</h1>
                <p style={{ fontSize: '1.2em', lineHeight: '1.5' }}>
                    These are a list of resources. Click on each to download:
                </p>
                <ul style={{ fontSize: '1.2em', lineHeight: '1.5' }}>
                    <li style={{ marginBottom: '10px' }}><Link href="/api/file-download/?filename=kenya-national-ehealth-policy-2016-2030.pdf" download>Kenya National eHealth Policy 2016-2030 </Link></li>
                    <li style={{ marginBottom: '10px' }}><Link href="/api/file-download/?filename=Kenya Health Sector Strategic Plan 2018-23.pdf" download>Kenya Health Sector Strategic Plan 2018-23 </Link></li>
                    <li style={{ marginBottom: '10px' }}><Link href="/api/file-download/?filename=Digital Health Act 15 of 2023.pdf" download>Digital Health Act 15 of 2023 </Link></li>
                    <li style={{ marginBottom: '10px' }}><Link href="/api/file-download/?filename=DRAFT KE-NHDD Governance Framework - Dec 5 2023.pdf" download>DRAFT KE-NHDD Governance Framework - Dec 5 2023 </Link></li>
                    <li style={{ marginBottom: '10px' }}><Link href="/api/file-download/?filename=DRAFT Kenya HIS Certification Framework - Draft 06FEB2017_KJO-edits_clean (3).pdf" download>DRAFT Kenya HIS Certification Framework - Draft 06FEB2017_KJO-edits_clean </Link></li>
                </ul>
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

export default ResourcesKnhts;
