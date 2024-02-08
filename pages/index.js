import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import {
    Button,
    CircularProgress,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
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
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Footer from '@/components/footer';

const inter = Inter({ subsets: ["latin"] });



export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState("1");

    const [loadingDomains, setLoadingDomains] = useState(true);
    const [domains, setDomains] = useState([]);

    const [loadingCollections, setLoadingCollections] = useState(true);
    const [sources, setSources] = useState([]);
    const [collections, setCollections] = useState([]);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    const [searchTerm, setSearchTerm] = useState("");
    const handleSearch = (event) => {
        event.preventDefault();
        router.push(`/search/?q=${searchTerm}`);
    };

    const fetchDomains = () => {
        setLoadingDomains(true);
        fetch(`/api/domains`)
            .then((res) => res.json())
            .then((data) => {
                let srcs = []
                setDomains([...data, { id: "/", name: "View all domains", icon: "all" }]);
                data.forEach((domain) => {
                    let domain_sources = Array.from(domain?.apiUrls, d => {
                        let d_ = d.split('/').filter(f => f)
                        let src = d_[d_.length - 3] + '/' + d_[d_.length - 1]
                        return src
                    })
                    srcs = srcs.concat(domain_sources)
                });
                setSources([...new Set(srcs)]);
                setLoadingDomains(false);
            })
            .catch((err) => {
                console.log(err);
                setLoadingDomains(false);
            });
    }
    const fetchCollections = () => {
        setLoadingCollections(true);
        fetch(`${API_BASE_URL}/collections/?limit=20`)
            .then((res) => res.json())
            .then((data) => {
                setCollections(data);
                setLoadingCollections(false);
            })
            .catch((err) => {
                console.log(err);
                setLoadingCollections(false);
            });
    }

    useEffect(() => {
        fetchDomains()
        fetchCollections()
    }, []);

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
                        sx={{ px: { xs: "1em", md: "2em" }, py: { xs: "1em", md: "1em" } }}
                    >
                        <Typography
                            variant="h3"
                            sx={{ display: { xs: "none", md: "flex" } }}
                            fontWeight={"bold"}
                            marginBottom={"1px"}
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
                            This is a platform which provides real-time electronic access to terminological resources and straightforward integration with <br></br>independent software platforms.
                        </Typography>
                    </Box>
                    <Box width={{ sm: "70%", md: "30%" }} sx={{ display: "flex" }} noValidate>
                        <TextField
                            onChange={(e) => setSearchTerm(e.target.value)}
                            sx={{
                                flexGrow: 1,
                                backgroundColor: "#fcfcfc",
                                borderRadius: "8px",
                            }}
                            id="searchTerm"
                            name="searchTerm"
                            placeholder="Search the Terminology Services"
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
                                {loadingDomains ? <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, minHeight: '400px' }}>
                                    <CircularProgress />
                                </Box> : <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                                        gap: 2
                                    }}
                                >
                                    {domains.map((domain) => (
                                        <Box
                                            key={domain.id}
                                            sx={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 1, my: { xs: "1", md: "2" }, px: 1, py: 1, borderRadius: "5px", backgroundColor: "#fcfcfc", border: "1px solid #ccc", borderRadius: "8px", ":hover": { backgroundColor: "#f0f0f0", cursor: 'pointer', color: '#FA8072' }, ":active": { backgroundColor: "#f0f0f0", cursor: 'pointer', color: '#FA8072' }, color: '#1651B6' }}
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
                                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                                <Typography variant="h6">{domain.name}</Typography>
                                                <div style={{ display: 'flex', gap: '1em' }}>
                                                    {/* <span style={{color: '#777', fontSize: '0.9em'}}>Subdomains: <b style={{color: '#333'}}>{ new Intl.NumberFormat().format(domain.metadata.number_of_subdomains) }</b></span> */}
                                                    {/* <span style={{color: '#777', fontSize: '0.9em'}}> | </span> */}
                                                    {/* <span style={{color: '#777', fontSize: '0.9em'}}>Concepts: <b style={{color: '#333'}}>{ new Intl.NumberFormat().format(domain.metadata.number_of_concepts) }</b></span> */}
                                                </div>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>}
                            </Box>
                        </TabPanel>
                        <TabPanel value="2">
                            <Box sx={{ flexGrow: "1", display: "flex", flexDirection: "column" }} >
                                <Typography variant="h4">Sources</Typography>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 'bold' }}>ORGANIZATION</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>SOURCE</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {sources.map((source, index) => (
                                                <TableRow key={index} sx={{ ":hover": { color: '#1651B6', cursor: 'pointer' } }} onClick={e => router.push(`/orgs/${source?.split('/')[0]}/sources/${source?.split('/')[1]}`)}>
                                                    <TableCell>{source?.split('/')[0]}</TableCell>
                                                    <TableCell>{source?.split('/')[1]}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </TabPanel>
                        <TabPanel value="3">
                            <Box sx={{ flexGrow: "1", display: "flex", flexDirection: "column" }} >
                                <Typography variant="h4">Collections</Typography>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Owner</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Collection Type</TableCell>
                                                <TableCell sx={{ fontWeight: 'bold' }}>Created at</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {collections.map((coll, index) => (
                                                <TableRow key={index} sx={{ 
                                                    // ":hover": { color: '#1651B6', cursor: 'pointer' }
                                                 }} onClick={e => {
                                                    router.push(coll.url)
                                                }}>
                                                    <TableCell>{coll.id}</TableCell>
                                                    <TableCell>{coll.name}</TableCell>
                                                    <TableCell>{coll.owner}</TableCell>
                                                    <TableCell>{coll.collection_type}</TableCell>
                                                    <TableCell>{new Date(coll.created_at).toLocaleString()}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </TabPanel>
                    </TabContext>
                </Box>

                <Box
                    style={{ backgroundColor: "#1651B6" }}
                    borderRadius={"8px"}
                    sx={{
                        display: "flex",
                        flexGrow: 1,
                        flexDirection: { xs: "column", md: "row" },
                        px: { xs: "1em", md: "0.5em" },
                        py: { xs: "2em", md: "0.5em" },
                        gap: 1,
                    }}
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            // gap: 2,
                            px: 2
                        }}
                    >
                        <Typography variant="h5" fontWeight={'600'} sx={{ mb: 0 }} color={"#fff"}>
                            {" "}
                            Can't find what you're looking for?{" "}
                        </Typography>
                        <Typography variant="h6" color={"#fff"}>
                            {" "}
                            You can submit a request for a concept to be added, or visit our{" "}
                            <Link href={"/auth/helpGuide"} style={{ color: "skyblue" }}>
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
                <Footer />
            </main>
        </>
    );

}
