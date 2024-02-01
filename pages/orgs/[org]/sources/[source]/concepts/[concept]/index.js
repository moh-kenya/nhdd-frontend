import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Box, Button, Typography } from '@mui/material'
import Link from 'next/link'

function ConceptDetail() {
    const router = useRouter()
    const { org, source, concept } = router.query

    const conceptDetail = {
        "uuid": "176303", "extras": {}, "checksums": { "smart": "2a4a7633f2c4cde6793dc5016fd801c5", "standard": "c8a179d9e4db2952338776abb271af6d" }, "id": "19327", "external_id": "165a6b90-55d7-4eba-b672-645c18de18b1", "concept_class": "Diagnosis", "datatype": "N/A", "url": "/orgs/MOH-KENYA/sources/nhdd/concepts/19327/", "retired": false, "source": "nhdd", "owner": "MOH-KENYA", "owner_type": "Organization", "owner_url": "/orgs/MOH-KENYA/", "display_name": "Nutritional marasmus", "display_locale": "en", "names": [{ "uuid": "218906", "name": "Nutritional marasmus", "external_id": "32561BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB", "type": "ConceptName", "locale": "en", "locale_preferred": true, "name_type": "FULLY_SPECIFIED", "checksum": "e1888f0ad650943c9f5671a81fff8e2f" }, { "uuid": "218907", "name": "Marasme nutritionnel", "external_id": "32562BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB", "type": "ConceptName", "locale": "fr", "locale_preferred": true, "name_type": "FULLY_SPECIFIED", "checksum": "458cb4aa60233f8303bf613428e65bb3" }, { "uuid": "218909", "name": "marasmo nutricional", "external_id": "71779BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB", "type": "ConceptName", "locale": "es", "locale_preferred": true, "name_type": "FULLY_SPECIFIED", "checksum": "dd7a825469b782127dae7e93732ebc44" }, { "uuid": "218912", "name": "Voedingsmarasmus", "external_id": "113688BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB", "type": "ConceptName", "locale": "nl", "locale_preferred": true, "name_type": "FULLY_SPECIFIED", "checksum": "c95ce84b6d2884fa5deb216d2886f961" }, { "uuid": "218916", "name": "Алиментарный маразм", "external_id": "132039BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB", "type": "ConceptName", "locale": "ru", "locale_preferred": true, "name_type": "FULLY_SPECIFIED", "checksum": "b316a1d6c7e807a26ee8df6657a8f393" }, { "uuid": "218911", "name": "Amaigrissement", "external_id": "107928BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB", "type": "ConceptName", "locale": "fr", "locale_preferred": false, "name_type": null, "checksum": "16c86e7c98b62ccc4b31349b234b31b3" }, { "uuid": "218913", "name": "Tình trạng gầy ốm dinh dưỡng", "external_id": "129319BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB", "type": "ConceptName", "locale": "vi", "locale_preferred": true, "name_type": "FULLY_SPECIFIED", "checksum": "758d03a7b9eab67bc00a906602b8bcf1" }, { "uuid": "218914", "name": "Tình trạng gầy ốm", "external_id": "131429BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB", "type": "ConceptName", "locale": "vi", "locale_preferred": false, "name_type": null, "checksum": "b400aa7f3ca36b175315ce1cbfd8078e" }, { "uuid": "218918", "name": "Marasmus", "external_id": "145398BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB", "type": "ConceptName", "locale": "nl", "locale_preferred": false, "name_type": null, "checksum": "b229e07a28129923d8f3d789b848222e" }], "descriptions": [{ "uuid": "45771", "description": "A syndrome produced by severe protein deficiency, characterized by retarded growth, changes in skin and hair pigment, edema, and pathologic changes in the liver, including fatty infiltration, necrosis, and fibrosis. The word is a local name in Gold Coast, Africa, meaning \"displaced child\". Although first reported from Africa, kwashiorkor is now known throughout the world, but mainly in the tropics and subtropics. It is considered to be related to marasmus. (From Dorland, 27th ed)", "external_id": "9762FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", "type": "ConceptDescription", "locale": "en", "locale_preferred": false, "description_type": "None", "checksum": "e51d2a41580fb09afa1fdc6717f8aaf1" }, { "uuid": "45770", "description": "MARASME", "external_id": "9763FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF", "type": "ConceptDescription", "locale": "fr", "locale_preferred": false, "description_type": "None", "checksum": "e2bd13a33eb1a52c4ef85ba26ffca693" }], "created_on": "2022-09-01T21:03:32.345593Z", "updated_on": "2022-09-01T21:03:32.354459Z", "versions_url": "/orgs/MOH-KENYA/sources/nhdd/concepts/19327/versions/", "version": "176303", "type": "Concept", "update_comment": null, "version_url": "/orgs/MOH-KENYA/sources/nhdd/concepts/19327/176311/", "updated_by": "ocladmin", "created_by": "ocladmin", "public_can_view": true, "versioned_object_id": 176303, "latest_source_version": null
    }

    return (
        <>
            <Head>
                <title>MOH KNHTS | {org}/{source}/{concept}</title>
                <meta name="description" content="MOH KNHTS" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* --------- <HERO ---------- */}
                <Box maxWidth={1280} sx={{ width: '100%', py: { xs: 2, md: 4 }, px: { xs: 1, md: 2 } }}>
                    <Box maxWidth={1280} sx={{ width: '100%' }}>
                        <button style={{ background: 'transparent', width: 'auto', border: 0, color: '#777', padding: 0 }} onClick={ev=>{
                            ev.preventDefault()
                            router.back()
                        }}> &larr; Back</button>
                    </Box>
                    <Box className="breadcrumb-container" sx={{ my: { xs: 1, md: 2 }, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, color: '#3d6393', fontSize: '0.9em' }}> {/* breadcrumb: org > source > domain > subdomain > concept */}
                        <Link href={"/"} style={{ textDecoration: 'none', color: '#1651B6' }} title="Org" className='breadcrumb-item'>Org</Link>
                        <Link href={"/"} style={{ textDecoration: 'none', color: '#1651B6' }} title="Source" className='breadcrumb-item'>Source</Link>
                        <Link href={"/"} style={{ textDecoration: 'none', color: '#1651B6' }} title="Domain" className='breadcrumb-item'>Domain</Link>
                        <Link href={"/"} style={{ textDecoration: 'none', color: '#1651B6' }} title="Subdomain" className='breadcrumb-item'>Subdomain</Link>
                        <span title="Concept ID" className='breadcrumb-item' style={{ textDecoration: 'none', color: '#1651B6' }}>19327</span>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0, my: 2 }}>
                        <Typography variant="h5" m={0} align="left" fontWeight={'bold'} color="text.primary" gutterBottom><span style={{ color: '#3d6393' }}>{conceptDetail.id}</span> {conceptDetail.display_name} </Typography>
                        <div>
                            <button style={{ background: 'transparent', width: 'auto', border: 0, color: '#1651B6', padding: 0 }}>
                                View other names / synonyms
                            </button>
                        </div>
                    </Box>
                    {conceptDetail?.descriptions && conceptDetail?.descriptions?.length > 0 ? <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0, my: 2 }}>
                        {
                            (([conceptDetail.descriptions.filter(c => c?.locale == conceptDetail.display_locale)[0]]) || [conceptDetail.descriptions[0]])?.map((description, index) => {
                                return <p key={index} style={{ margin: 0 }}> <em style={{ color: '#777', margin: '0 5px 0 0' }}>[{description.locale}]</em> {description.description}</p>
                            })}
                        <div>
                            <button style={{ background: 'transparent', width: 'auto', border: 0, color: '#1651B6', padding: 0 }}>
                                View other descriptions
                            </button>
                        </div>
                    </Box> : <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0, my: 2 }}>
                        <p> No description(s) found </p>
                    </Box>}

                </Box>
                {/* --------- HERO/> --------- */}
            </Box>

        </>
    )
}

export default ConceptDetail