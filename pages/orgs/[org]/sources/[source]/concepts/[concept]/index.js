import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import {
    Box,
    Button,
    Chip,
    Dialog,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Skeleton
} from "@mui/material";
import Link from "next/link";
import { getConceptDetail, getConceptVersions, getConceptRelated } from '../../../../../../api/conceptDetail'

function ConceptDetail() {
    const router = useRouter();
    const { org, source, concept } = router.query;
    const {
        data: conceptDetail,
        isError,
        isLoading,
    } = getConceptDetail(org, source, concept);
    const {
        data: conceptVersions,
        isError: versionfetchError,
        isLoading: versionfetchLoading,
    } = getConceptVersions(org, source, concept); // TODONE: get concept versions
    const {
        data: conceptRelated,
        isError: relatedfetchError,
        isLoading: relatedfetchLoading,
    } = getConceptRelated(org, source, concept); // TODONE: get concept relatives

    const childConcepts = []; // TODO: get child concepts
    const parentConcepts = []; // TODO: get parent concepts

    const [synonymsDialogOpen, setSynonymsDialogOpen] = React.useState(false);
    const [descriptionsDialogOpen, setDescriptionsDialogOpen] =
        React.useState(false);

    if (isLoading) {
        return (
            <Box sx={{ pt: 0.5 }}>
                <Skeleton />
                <Skeleton width="60%" />
            </Box>
        );
    }

    if (isError) {
        return (
            <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    Error fetching data, please retry.
                </Alert>
            </Stack>
        );
    }

    return (
        <>
            <Head>
                <title>
                    MOH KNHTS | {org}/{source}/{concept}
                </title>
                <meta name="description" content="MOH KNHTS" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" }, gap: 2, }}>
                {/* --------- <Main ---------- */}
                <Box sx={{ py: { xs: 2, md: 4 }, px: { xs: 1, md: 2 } }} >
                    <Box maxWidth={1280} sx={{ width: "100%" }}>
                        <button
                            style={{ background: "transparent", width: "auto", border: 0, color: "#777", padding: 0, }}
                            onClick={(ev) => {
                                ev.preventDefault();
                                router.back();
                            }}
                        > {" "} &larr; Back </button>
                    </Box>
                    <Box
                        className="breadcrumb-container"
                        sx={{ my: { xs: 1, md: 2 }, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1, color: "#3d6393", fontSize: "0.9em", }}
                    >
                        {" "}
                        {/* breadcrumb: org > source > domain > subdomain > concept */}
                        <Link href={`/orgs/${org}/sources/`} style={{ textDecoration: "none", color: "#1651B6" }} title="Org" className="breadcrumb-item"> {org} </Link>
                        <Link href={`/orgs/${org}/sources/${source}`} style={{ textDecoration: "none", color: "#1651B6" }} title="Source" className="breadcrumb-item"> {source} </Link>
                        <span title="Concept ID" className="breadcrumb-item" style={{ textDecoration: "none", color: "#777" }}> {conceptDetail.id} </span>
                    </Box>

                    {/* Names */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0, my: 2 }}>
                        <Typography variant="h5" m={0} align="left" fontWeight={"bold"} color="text.primary" gutterBottom>
                            <span style={{ color: "#3d6393" }}>{conceptDetail.id}</span>{" "}
                            {conceptDetail.display_name}{" "}
                        </Typography>
                        <div>
                            <button
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    setSynonymsDialogOpen(true);
                                }}
                                style={{ background: "transparent", width: "auto", border: 0, color: "#1651B6", padding: 0, }} >
                                View other names / synonyms
                            </button>
                            <Dialog onClose={() => setSynonymsDialogOpen(false)} open={synonymsDialogOpen}>
                                <div style={{ padding: 10 }}>
                                    <h4>Synonyms</h4>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 3, my: 2, }}>
                                        {conceptDetail?.names?.map((name, index) => {
                                            return (
                                                <p key={index} style={{ margin: 0 }}>
                                                    {" "}
                                                    <em style={{ color: "#777", margin: "0 5px 0 0" }}>
                                                        [{name.index}]
                                                    </em>{" "}
                                                    <b>{name.uuid}</b> {name.name}
                                                </p>
                                            );
                                        })}
                                    </div>
                                </div>
                            </Dialog>
                        </div>
                    </Box>

                    {/* Descriptions */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0, my: 3 }}>
                        <Typography variant="h6" m={0} align="left" fontWeight={"bold"} color="text.primary" gutterBottom>
                            Description
                        </Typography>
                        {conceptDetail?.descriptions &&
                            conceptDetail?.descriptions?.length > 0 ? (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 0, my: 3 }} >
                                {(
                                    [
                                        conceptDetail.descriptions.filter(
                                            (c) => c?.locale == conceptDetail.display_locale
                                        )[0],
                                    ] || [conceptDetail.descriptions[0]]
                                )?.map((description, index) => {
                                    return (
                                        <p key={index} style={{ margin: 0 }}>
                                            {" "}
                                            <em style={{ color: "#777", margin: "0 5px 0 0" }}>
                                                [{description.locale}]
                                            </em>{" "}
                                            {description.description}
                                        </p>
                                    );
                                })}
                                <div style={{ marginTop: "4px" }}>
                                    <button onClick={(ev) => { ev.preventDefault(); setDescriptionsDialogOpen(true); }} style={{ background: "transparent", width: "auto", border: 0, color: "#1651B6", padding: 0, }} >
                                        View other descriptions
                                    </button>
                                    <Dialog onClose={() => setDescriptionsDialogOpen(false)} open={descriptionsDialogOpen} >
                                        <div style={{ padding: 10 }}>
                                            <h4>Descriptions</h4>
                                            <div
                                                style={{ display: "flex", flexDirection: "column", gap: 0, my: 2, }}
                                            >
                                                {conceptDetail?.descriptions?.map(
                                                    (description, index) => {
                                                        return (
                                                            <p key={index} style={{ margin: "10px 0" }}>
                                                                {" "}
                                                                <em style={{ color: "#777", margin: "0 5px 0 0" }} > [{description.locale}] </em>{" "}
                                                                <b>{description.uuid}</b>{" "}
                                                                {description.description}
                                                            </p>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                    </Dialog>
                                </div>
                            </Box>
                        ) : (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 0, px: 1, color: "#777", }} >
                                <p style={{ margin: "5px 0" }}> None </p>
                            </Box>
                        )}
                    </Box>

                    {/* Attributes */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0, my: 3 }}>
                        <Typography variant="h6" m={0} align="left" fontWeight={"bold"} color="text.primary" gutterBottom>
                            Attributes
                        </Typography>
                        {conceptDetail?.extras &&
                            Object.keys(conceptDetail?.extras).length > 0 ? (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, my: 2 }} >
                                {Object.keys(conceptDetail?.extras).map((key, index) => {
                                    return (
                                        <div key={index} style={{ margin: 0, display: "grid", gridTemplateColumns: "auto 1fr", gap: "0.5em", }}>
                                            <span style={{ textTransform: "capitalize", marginRight: "1em", fontWeight: "500", }}
                                            >
                                                {key.split("_").join(" ")}:{" "}
                                            </span>

                                            {typeof conceptDetail?.extras[key] == "string" ||
                                                typeof conceptDetail?.extras[key] == "number" ||
                                                typeof conceptDetail?.extras[key] == "boolean" ? (
                                                <span>
                                                    {conceptDetail?.extras[key]?.startsWith("http") ? (
                                                        <a href={conceptDetail?.extras[key]} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#1651B6", }}>
                                                            {conceptDetail?.extras[key]}
                                                        </a>
                                                    ) : (
                                                        <span>{conceptDetail?.extras[key]}</span>
                                                    )}
                                                </span>
                                            ) : (
                                                <code style={{ fontSize: "0.9em", whiteSpace: "break-spaces", display: "block", backgroundColor: "#f2efe9", padding: "1em", borderRadius: "5px", margin: "1em 0", }}>
                                                    {JSON.stringify(conceptDetail?.extras[key], null, 2)}
                                                </code>
                                            )}
                                        </div>
                                    );
                                })}
                            </Box>
                        ) : (
                            <Box
                                sx={{ display: "flex", flexDirection: "column", gap: 0, px: 1, color: "#777", }}>
                                <p style={{ margin: "5px 0" }}> None </p>
                            </Box>
                        )}
                    </Box>

                    {/* Relationships */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0, my: 3 }}>
                        <Typography variant="h6" m={0} align="left" fontWeight={"bold"} color="text.primary" gutterBottom> Relationships / Associated </Typography>
                        {conceptDetail?.mappings && conceptDetail?.mappings.length > 0 ? (
                            <TableContainer>
                                <Table size="small" sx={{ border: "1px solid #ccc" }}>
                                    <TableHead>
                                        <TableRow sx={{ bgcolor: "InfoBackground" }}>
                                            <TableCell sx={{ fontWeight: "600" }}>
                                                Relationship
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: "600" }}>Code</TableCell>
                                            <TableCell sx={{ fontWeight: "600" }}>Name</TableCell>
                                            <TableCell sx={{ fontWeight: "600" }}>Source</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {conceptDetail?.mappings.map((entry, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell>{entry.map_type}</TableCell>
                                                    <TableCell
                                                        onClick={(ev) => {
                                                            // go to concept page
                                                            ev.preventDefault();
                                                            router.push(
                                                                `/orgs/${org}/sources/${source}/concepts/${entry.to_concept_code}`
                                                            );
                                                        }}
                                                        sx={{ color: "#1651B6" }}
                                                    >
                                                        {entry.to_concept_code}
                                                    </TableCell>
                                                    <TableCell
                                                        onClick={(ev) => {
                                                            // go to concept page
                                                            ev.preventDefault();
                                                            router.push(
                                                                `/orgs/${org}/sources/${source}/concepts/${entry.to_concept_code}`
                                                            );
                                                        }}
                                                        sx={{ color: "#1651B6" }}
                                                    >
                                                        {entry.cascade_target_concept_name}
                                                    </TableCell>
                                                    <TableCell
                                                        onClick={(ev) => {
                                                            // go to source page
                                                            ev.preventDefault();
                                                            router.push(`/orgs/${org}/sources/${source}`);
                                                        }}
                                                    >
                                                        {entry.cascade_target_source_name}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <Box
                                sx={{ display: "flex", flexDirection: "column", gap: 0, px: 1, color: "#777", }}>
                                <p style={{ margin: "5px 0" }}> None </p>
                            </Box>
                        )}
                    </Box>

                    {/* Memberships */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0, my: 3 }}>
                        <Typography variant="h6" m={0} align="left" fontWeight={"bold"} color="text.primary" gutterBottom > Memberships </Typography>
                        {/* TODO */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 0, px: 1, color: "#777", }} >
                            <p style={{ margin: "5px 0" }}> None </p>
                        </Box>
                    </Box>

                    {/* Versions */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0, my: 3 }}>
                        <Typography variant="h6" m={0} align="left" fontWeight={"bold"} color="text.primary" gutterBottom> Concept versions </Typography>
                        {conceptVersions?.length > 0 ? (
                            conceptVersions?.map((version, index) => {
                                return (
                                    <div key={index} style={{ display: "flex", alignItems: "center", gap: 3, margin: "7px 0", }} >
                                        {index + 1}. <Chip size="small" variant="filled" color="primary" label={version?.uuid} onClick={(ev) => {
                                            ev.preventDefault();
                                            // router.push(
                                            //     `/orgs/${org}/sources/${source}/concepts/${concept}/${version?.uuid}`
                                            // );
                                        }}
                                        />
                                    </div>
                                );
                            })
                        ) : (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 0, px: 1, color: "#777", }} >
                                <p style={{ margin: "5px 0" }}> None </p>
                            </Box>
                        )}
                    </Box>
                </Box>
                {/* --------- Main/> --------- */}

                {/* --------- <Sidebar ---------- */}
                <Box sx={{ py: { xs: 2, md: 4 }, px: { xs: 1, md: 2 }, mt: { xs: 1, md: 3 } }} >
                    <Typography variant="h6" m={0} align="left" fontWeight={"bold"} color="text.primary" gutterBottom>Related concepts</Typography>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ textTransform: 'uppercase' }}>Code</TableCell>
                                    <TableCell sx={{ textTransform: 'uppercase' }}>Concept</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {conceptRelated?.entry?.entries?.filter(c => c?.type?.toLocaleLowerCase() == 'concept')?.map((concept, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{concept.id}</TableCell>
                                            <TableCell>
                                                <Link href={`/orgs/${org}/sources/${source}/concepts/${concept.id}`} style={{ textDecoration: 'none' }}>
                                                    {concept.display_name || concept.cascade_target_concept_name}
                                                </Link>
                                                {concept?.entries?.length > 0 && <details>
                                                    <summary>Children</summary>
                                                    {concept?.entries?.map((child, index2) => {
                                                        return (
                                                            <Box key={"c-" + index2} sx={{ ml: 2 }}>
                                                                {index2 + 1}. <Link className="text-sky-700" href={`/orgs/${org}/sources/${source}/concepts/${child.id}`} style={{ textDecoration: 'none' }}>
                                                                {child?.id} {child.display_name || child.cascade_target_concept_name}
                                                                </Link>
                                                            </Box>
                                                        );
                                                    })}
                                                </details>}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                {/* --------- Sidebar/> ---------- */}
            </Box>
        </>
    );
}

export default ConceptDetail;