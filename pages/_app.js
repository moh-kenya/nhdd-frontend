
import { Box } from '@mui/material';
import '../public/assets/css/custom.css'
import NavBar from '@/components/Navbar';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Box sx={{ flexGrow: 1 }} marginBottom={2}>
                <NavBar />
            </Box>
            <Component {...pageProps} />
        </>
    );
}
