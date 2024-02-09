import * as React from 'react';
import Box from '@mui/material/Box';
import Link from 'next/link';

export default function Footer() {
    return (
        <>
            <Box style={{ backgroundColor: "#fcfcfc" }} my={1}
                sx={{
                    display: "flex",
                    flexGrow: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    px: { xs: "1em", md: "2em" },
                    py: { xs: "1em", md: "2em" },
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        flexGrow: 1,
                        display: { xs: "none", md: "flex" },
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 2,
                    }}
                >
                    <Link
                        style={{
                            fontWeight: "500",
                            textDecoration: "none",
                            color: "#334",
                            fontSize: "1.1em",
                        }}
                        href={"/about"}
                    >
                        About
                    </Link>
                    <Link
                        style={{
                            fontWeight: "500",
                            textDecoration: "none",
                            color: "#334",
                            fontSize: "1.1em",
                        }}
                        href={"/resources"}
                    >
                        Resources
                    </Link>
                    <Link
                        style={{
                            fontWeight: "500",
                            textDecoration: "none",
                            color: "#334",
                            fontSize: "1.1em",
                        }}
                        href={"/knowledgebase"}
                    >
                        Knowledge base
                    </Link>
                    <Link
                        style={{
                            fontWeight: "500",
                            textDecoration: "none",
                            color: "#334",
                            fontSize: "1.1em",
                        }}
                        href={"/help"}
                    >
                        Help &amp; guides
                    </Link>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    px={2}
                >
                </Box>
            </Box>
        </>
    )
}