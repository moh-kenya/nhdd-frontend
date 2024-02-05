import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import {
    Button,
    IconButton,
    Tabs,
    TextField,
    Toolbar,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Navbar from "@/components/Navbar";
import { GitHub, Search } from "@mui/icons-material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("1");

    const [domains, setDomains] = useState([
        { id: "diagnostics", name: "Diagnostic Information Health", icon: "stethoscope", "metadata": { number_of_subdomains: 15, number_of_concepts: 4553 } },
        {
            id: "products-technologies",
            name: "Health Products and Technologies(HPT)",
            icon: "med", "metadata": { number_of_subdomains: 10, number_of_concepts: 5243 },
        },
        { id: "investigations", name: "Investigations (Lab and Imaging)", icon: "microscope", "metadata": { number_of_subdomains: 23, number_of_concepts: 7231 } },
        {
            id: "procedures-services",
            name: "Procedures & Services",
            icon: "surgery", "metadata": { number_of_subdomains: 10, number_of_concepts: 9225 },
        },
        {
            id: "billing-claims",
            name: "Billing & eClaims Management",
            icon: "finance", "metadata": { number_of_subdomains: 27, number_of_concepts: 1108 },
        },
        { id: "hrh", name: "Human Resources for Health (HRH)", icon: "doctor", "metadata": { number_of_subdomains: 16, number_of_concepts: 5617 } },
        { id: "devices-infra", name: "Medical Devices Infrastructure", icon: "devices", "metadata": { number_of_subdomains: 14, number_of_concepts: 410 } },
        { id: "supply-chain", name: "Supplies Chain Management", icon: "car", "metadata": { number_of_subdomains: 27, number_of_concepts: 615 } },
    ]);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (event) => {
        event.preventDefault();
        router.push(`/search/?q=${searchTerm}`);
    };

    return (
        <>
            <Head>
                <title>MOH KNHTS</title>
                <meta name="description" content="MOH KNHTS" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Box
                    style={{ backgroundColor: "#1651B6" }}
                    borderRadius={"8px"}
                    sx={{
                        display: 'flex',
                        flexDirection: "column",
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: { xs: "1em", md: "0.3em" },
                        py: { xs: "1em", md: "0.3em" },
                    }}
                >
                    <Box
                        borderRadius={"8px"}
                        sx={{ px: { xs: "1em", md: "2em" }, py: { xs: "1em", md: "2em" } }}
                    >
                        <Typography
                            variant="h3"
                            sx={{ display: { xs: "none", md: "flex" } }}
                            fontWeight={"bold"}
                            marginBottom={"5px"}
                            color={"#fff"}
                        >
                            Kenya National Health Terminology Services
                        </Typography>
                        <Typography
                            variant="h4"
                            sx={{ display: { xs: "flex", md: "none" } }}
                            fontWeight={"bold"}
                            marginBottom={"5px"}
                            color={"#fff"}
                        >
                        </Typography>
                        <Typography variant="h6" color={"#fff"}>
                            The reference point for health information standards supporting
                            healthcare activities in Kenya.
                        </Typography>
                    </Box>
                    <Box width={{ sm : "70%" , md: "30%"}} sx={{ display: "flex" }} noValidate>
                        <TextField
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{
                                flexGrow: 1,
                                backgroundColor: "#fcfcfc",
                                borderRadius: "8px",
                            }}
                            id="searchTerm"
                            name="searchTerm"
                            label="Search the Terminology Services"
                            variant="outlined"
                            color={"info"}
                        />
                        <Button
                            onClick={handleSearch}
                            sx={{
                                borderRadius: "8px",
                                marginLeft: "10px",
                                backgroundColor: "#fff",
                                color: "#333",
                            }}
                            variant="contained"
                            color="primary"
                        >
                            <Search />
                        </Button>
                    </Box>
                </Box>

                <Typography
                    variant="h4"
                    my={4}
                    textAlign={"center"}
                    fontWeight={"bold"}
                    marginBottom={"5px"}
                >
                    {" "}
                    Terminology Resources{" "}
                </Typography>

                <Box sx={{ width: "100%", typography: "body1" }}>
                    <TabContext value={activeTab}>
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <TabList
                                onChange={handleTabChange}
                                centered
                                variant="standard"
                                aria-label="lab API tabs example"
                            >
                                <Tab label="Concept Domains" value="1" />
                                <Tab label="Sources" value="2" />
                                <Tab label="Collections" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Box
                                sx={{ flexGrow: "1", display: "flex", flexDirection: "column" }}
                            >
                                <Typography variant="h5">Concept Domains</Typography>
                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                                        gap: 2,
                                    }}
                                >
                                    {domains.map((domain) => (
                                        <Box
                                            key={domain.id}
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                my: { xs: "1", md: "2" },
                                                px: 1,
                                                py: 1,
                                                borderRadius: "5px",
                                                backgroundColor: "#fcfcfc",
                                                border: "1px solid #ccc",
                                                borderRadius: "8px",
                                                ":hover": { backgroundColor: "#f0f0f0", cursor: 'pointer', color: '#FA8072' },
                                                ":active": { backgroundColor: "#f0f0f0", cursor: 'pointer', color: '#FA8072' },
                                                color: '#1651B6',
                                            }}
                                            onClick={ev => {
                                                ev.preventDefault()
                                                router.push(`/orgs/MOH-KENYA/domains/${domain.id}`)
                                            }}
                                        >
                                           <Image
                                                src={"/assets/images/" + domain.icon + ".png"}
                                                alt={domain.name}
                                                width={50}
                                                height={50}
                                            />
                                            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                                                <Typography variant="h6">{domain.name}</Typography>
                                                <div style={{display: 'flex', gap: '1em'}}>
                                                    <span style={{color: '#777', fontSize: '0.9em'}}>Subdomains: <b style={{color: '#333'}}>{ new Intl.NumberFormat().format(domain.metadata.number_of_subdomains) }</b></span>
                                                    {/* <span style={{color: '#777', fontSize: '0.9em'}}> | </span> */}
                                                    <span style={{color: '#777', fontSize: '0.9em'}}>Concepts: <b style={{color: '#333'}}>{ new Intl.NumberFormat().format(domain.metadata.number_of_concepts) }</b></span>
                                                </div>
                                            </Box>
                                        </Box>
                                    ))}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Link
                                            href="/orgs/MOH-KENYA/domains"
                                            style={{ color: "#1651B6", textDecoration: "none" }}
                                        >
                                            {" "}
                                            View all domains &hellip;{" "}
                                        </Link>
                                    </Box>
                                </Box>
                            </Box>
                        </TabPanel>
                        <TabPanel value="2">
                            <Box
                                sx={{ flexGrow: "1", display: "flex", flexDirection: "column" }}
                            >
                                <Typography variant="h5">Sources</Typography>
                            </Box>
                        </TabPanel>
                        <TabPanel value="3">
                            <Box
                                sx={{ flexGrow: "1", display: "flex", flexDirection: "column" }}
                            >
                                <Typography variant="h5">Collections</Typography>
                            </Box>
                        </TabPanel>
                    </TabContext>
                </Box>

                <Box
                    style={{ backgroundColor: "#121212" }}
                    borderRadius={"8px"}
                    sx={{
                        display: "flex",
                        flexGrow: 1,
                        flexDirection: { xs: "column", md: "row" },
                        px: { xs: "1em", md: "2em" },
                        py: { xs: "2em", md: "3em" },
                        gap: 3,
                    }}
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <Typography variant="h4" color={"#fff"}>
                            {" "}
                            Can't find what you're looking for?{" "}
                        </Typography>
                        <Typography variant="h6" color={"#fff"}>
                            {" "}
                            You can submit a request for a concept to be added, or visit our{" "}
                            <Link href={"/support"} style={{ color: "skyblue" }}>
                                help &amp; support page
                            </Link>{" "}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            size="large"
                            sx={{
                                borderRadius: "11px",
                                marginLeft: "10px",
                                backgroundColor: "#fff",
                                color: "#333",
                            }}
                            variant="contained"
                            color="primary"
                            href={"/RequestConcept"}
                        >
                            Submit Request
                        </Button>
                    </Box>
                </Box>
                <Box
                    style={{ backgroundColor: "#fcfcfc" }}
                    my={1}
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
                    <Box>
                        <img
                            src="/assets/images/image.png"
                            alt="MoH KNHTS"
                            width={"auto"}
                            height={60}
                        />
                    </Box>
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
                            href={"/"}
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
                            href={"/"}
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
                            href={"/"}
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
                            href={"/"}
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
                        <Link
                            style={{
                                fontWeight: "500",
                                textDecoration: "none",
                                color: "#334",
                                fontSize: "1.1em",
                            }}
                            href={"/"}
                        >
                            <GitHub />
                        </Link>
                    </Box>
                </Box>
                <Box
                    sx={{
                        borderTop: "3px solid #333",
                        py: 3,
                        flexGrow: 1,
                        display: { xs: "none", md: "flex" },
                        flexDirection: "row",
                        justifyContent: "center",
                        gap: 3,
                    }}
                  >
                    <Link
                      href="/domains"
                      style={{ color: "#1651B6", textDecoration: "none" }}
                    >
                    </Link>
                </Box>
            </main>
        </>
    );

}
