
import { Box } from '@mui/material';
import '../public/assets/css/custom.css'
import NavBar from '@/components/Navbar';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }} marginBottom={2}>
                <NavBar />
                {/* TODO: breadcrumbs */}
            </Box>
            <Component {...pageProps} />
        </>
    );
}
