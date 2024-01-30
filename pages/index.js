import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import { Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <>
            <Head>
                <title>MOH NHDD</title>
                <meta name="description" content="MOH NHDD" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" color="transparent" variant="outlined">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                MOH NHDD
                            </Typography>
                            <Button color="inherit">Login</Button>
                        </Toolbar>
                    </AppBar>
                </Box>
            </main>
        </>
    );
}
