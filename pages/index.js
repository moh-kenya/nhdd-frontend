import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import { Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>
            <Head>
                <title>MOH KNHTS</title>
                <meta name="description" content="MOH KNHTS" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Navbar />
            </main>
        </>
    );
}
