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
import { getConceptDetail } from '../../../../../../api/conceptDetail'

function ConceptDetail() {
  const router = useRouter();
  const { org, source, concept } = router.query;
  const {
    data: conceptDetail,
    isError,
    isLoading,
  } = getConceptDetail(org, source, concept);



  const conceptVersions = [
    {
      uuid: "232002",
      checksums: {
        smart: "a1ba9d9aae1c380fda1ef8e1c810f674",
        standard: "f696fe1bd07e20ea9d4a5bda386c46d0",
      },
      id: "43323",
      external_id: "687565ff-de9c-42f0-b300-cdb4aa3ae3e3",
      concept_class: "Diagnosis",
      datatype: "N/A",
      url: "/orgs/MOH-KENYA/sources/nhdd/concepts/43323/",
      retired: false,
      source: "nhdd",
      owner: "MOH-KENYA",
      owner_type: "Organization",
      owner_url: "/orgs/MOH-KENYA/",
      display_name: "Malaria",
      display_locale: "en",
      version: "232002",
      update_comment: null,
      locale: null,
      version_created_by: "ocladmin",
      version_created_on: "2022-09-01T21:17:37.725129Z",
      is_latest_version: true,
      versions_url: "/orgs/MOH-KENYA/sources/nhdd/concepts/43323/versions/",
      version_url: "/orgs/MOH-KENYA/sources/nhdd/concepts/43323/232002/",
      type: "Concept",
      versioned_object_id: 231999,
      version_updated_on: "2022-09-01T21:17:37.730273Z",
      version_updated_by: "ocladmin",
      latest_source_version: "v23-09",
      previous_version_url: null,
      source_versions: [
        "/orgs/MOH-KENYA/sources/nhdd/v23-09/",
        "/orgs/MOH-KENYA/sources/nhdd/v23-04/",
      ],
      collection_versions: [],
    },
  ];

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

      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >


        {/* --------- <HERO ---------- */}
        <Box
          maxWidth={1280}
          sx={{ width: "100%", py: { xs: 2, md: 4 }, px: { xs: 1, md: 2 } }}
        >
          <Box maxWidth={1280} sx={{ width: "100%" }}>
            <button
              style={{
                background: "transparent",
                width: "auto",
                border: 0,
                color: "#777",
                padding: 0,
              }}
              onClick={(ev) => {
                ev.preventDefault();
                router.back();
              }}
            >
              {" "}
              &larr; Back
            </button>
          </Box>
          <Box
            className="breadcrumb-container"
            sx={{
              my: { xs: 1, md: 2 },
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 1,
              color: "#3d6393",
              fontSize: "0.9em",
            }}
          >
            {" "}
            {/* breadcrumb: org > source > domain > subdomain > concept */}
            <Link
              href={`orgs/${org}`}
              style={{ textDecoration: "none", color: "#1651B6" }}
              title="Org"
              className="breadcrumb-item"
            >
              {org}
            </Link>
            <Link
              href={`/orgs/[orgs]/sources/${source}`}
              style={{ textDecoration: "none", color: "#1651B6" }}
              title="Source"
              className="breadcrumb-item"
            >
              {source}
            </Link>
            <span
              title="Concept ID"
              className="breadcrumb-item"
              style={{ textDecoration: "none", color: "#777" }}
            >
              {conceptDetail.id}
            </span>
          </Box>

          {/* Names */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0, my: 2 }}>
            <Typography
              variant="h5"
              m={0}
              align="left"
              fontWeight={"bold"}
              color="text.primary"
              gutterBottom
            >
              <span style={{ color: "#3d6393" }}>{conceptDetail.id}</span>{" "}
              {conceptDetail.display_name}{" "}
            </Typography>
            <div>
              <button
                onClick={(ev) => {
                  ev.preventDefault();
                  setSynonymsDialogOpen(true);
                }}
                style={{
                  background: "transparent",
                  width: "auto",
                  border: 0,
                  color: "#1651B6",
                  padding: 0,
                }}
              >
                View other names / synonyms
              </button>
              <div style={{ padding: 10 }}>
                <h4>Synonyms</h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    my: 2,
                  }}
                >
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
              <Dialog
                onClose={() => setSynonymsDialogOpen(false)}
                open={synonymsDialogOpen}
              >
                <div style={{ padding: 10 }}>
                  <h4>Synonyms</h4>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                      my: 2,
                    }}
                  >
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
          {conceptDetail?.descriptions &&
            conceptDetail?.descriptions?.length > 0 ? (
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 0, my: 3 }}
            >
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
                <button
                  onClick={(ev) => {
                    ev.preventDefault();
                    setDescriptionsDialogOpen(true);
                  }}
                  style={{
                    background: "transparent",
                    width: "auto",
                    border: 0,
                    color: "#1651B6",
                    padding: 0,
                  }}
                >
                  View other descriptions
                </button>
                <Dialog
                  onClose={() => setDescriptionsDialogOpen(false)}
                  open={descriptionsDialogOpen}
                >
                  <div style={{ padding: 10 }}>
                    <h4>Descriptions</h4>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0,
                        my: 2,
                      }}
                    >
                      {conceptDetail?.descriptions?.map(
                        (description, index) => {
                          return (
                            <p key={index} style={{ margin: "10px 0" }}>
                              {" "}
                              <em
                                style={{ color: "#777", margin: "0 5px 0 0" }}
                              >
                                [{description.locale}]
                              </em>{" "}
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                px: 1,
                color: "#777",
              }}
            >
              <p style={{ margin: "5px 0" }}> None </p>
            </Box>
          )}

          {/* Attributes */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0, my: 3 }}>
            <Typography
              variant="h6"
              m={0}
              align="left"
              fontWeight={"bold"}
              color="text.primary"
              gutterBottom
            >
              Attributes
            </Typography>
            {conceptDetail?.extras &&
              Object.keys(conceptDetail?.extras).length > 0 ? (
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 0, my: 2 }}
              >
                {Object.keys(conceptDetail?.extras).map((key, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        margin: 0,
                        display: "grid",
                        gridTemplateColumns: "auto 1fr",
                        gap: "0.5em",
                      }}
                    >
                      <span
                        style={{
                          textTransform: "capitalize",
                          marginRight: "1em",
                          fontWeight: "500",
                        }}
                      >
                        {key.split("_").join(" ")}:{" "}
                      </span>

                      {typeof conceptDetail?.extras[key] == "string" ||
                        typeof conceptDetail?.extras[key] == "number" ||
                        typeof conceptDetail?.extras[key] == "boolean" ? (
                        <span>
                          {conceptDetail?.extras[key]?.startsWith("http") ? (
                            <a
                              href={conceptDetail?.extras[key]}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                textDecoration: "none",
                                color: "#1651B6",
                              }}
                            >
                              {conceptDetail?.extras[key]}
                            </a>
                          ) : (
                            <span>{conceptDetail?.extras[key]}</span>
                          )}
                        </span>
                      ) : (
                        <code
                          style={{
                            fontSize: "0.9em",
                            whiteSpace: "break-spaces",
                            display: "block",
                            backgroundColor: "#f2efe9",
                            padding: "1em",
                            borderRadius: "5px",
                            margin: "1em 0",
                          }}
                        >
                          {JSON.stringify(conceptDetail?.extras[key], null, 2)}
                        </code>
                      )}
                    </div>
                  );
                })}
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  px: 1,
                  color: "#777",
                }}
              >
                <p style={{ margin: "5px 0" }}> None </p>
              </Box>
            )}
          </Box>

          {/* Relationships */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0, my: 3 }}>
            <Typography
              variant="h6"
              m={0}
              align="left"
              fontWeight={"bold"}
              color="text.primary"
              gutterBottom
            >
              Relationships / Associated
            </Typography>
            {conceptDetail?.entries && conceptDetail?.entries.length > 0 ? (
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
                    {conceptDetail?.entries.map((entry, index) => {
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
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  px: 1,
                  color: "#777",
                }}
              >
                <p style={{ margin: "5px 0" }}> None </p>
              </Box>
            )}
          </Box>

          {/* Memberships */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0, my: 3 }}>
            <Typography
              variant="h6"
              m={0}
              align="left"
              fontWeight={"bold"}
              color="text.primary"
              gutterBottom
            >
              Memberships
            </Typography>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 0, my: 2 }}
            >
              {/* TODO */}
            </Box>
          </Box>

          {/* Versions */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 0, my: 3 }}>
            <Typography
              variant="h6"
              m={0}
              align="left"
              fontWeight={"bold"}
              color="text.primary"
              gutterBottom
            >
              Concept versions
            </Typography>
            {conceptVersions?.length > 0 &&
              conceptVersions?.map((concept_version, indx) => (
                <div key={indx}>
                  {concept_version?.source_versions?.length > 0 ? (
                    concept_version?.source_versions?.map((version, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 3,
                            margin: "7px 0",
                          }}
                        >
                          {version
                            .split("/")
                            .filter((v) => !["orgs", "sources"].includes(v))
                            .filter((v) => v)
                            .map((v, indx) => {
                              // 0 = org, 1 = source, 2 = version
                              return (
                                <Chip
                                  size="small"
                                  variant="outlined"
                                  color="primary"
                                  key={indx}
                                  label={v}
                                  onClick={(ev) => {
                                    ev.preventDefault();
                                    if (indx == 0) {
                                      // go to org page
                                      router.push(`/orgs/${v}`);
                                    } else if (indx == 1) {
                                      // go to source page
                                      router.push(`/orgs/${org}/sources/${v}`);
                                    } else if (indx == 2) {
                                      // go to version page
                                      router.push(
                                        `/orgs/${org}/sources/${source}/versions/${v}`
                                      );
                                    }
                                  }}
                                />
                              );
                            })}
                        </div>
                      );
                    })
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0,
                        px: 1,
                        color: "#777",
                      }}
                    >
                      <p style={{ margin: "5px 0" }}> None </p>
                    </Box>
                  )}
                </div>
              ))}
          </Box>
        </Box>
        {/* --------- HERO/> --------- */}
      </Box>
    </>
  );
}

export default ConceptDetail;
