import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import PersonTwoTone from '@mui/icons-material/PersonTwoTone';
import Link from 'next/link';
import { SearchRounded, SearchTwoTone } from '@mui/icons-material';

const pages = [
    {name: 'Concepts', link: '/search'},
    {name: 'Domains',  link: '/orgs/MOH-KENYA/domains'},
    {name: 'Organisation Units',  link: '/orgs/'},
    {name: 'Announcements',  link: '/announcements'},
    {name: 'Resources', link: '/resources'},
];
const settings = ['Profile', 'Help & FAQ', 'Logout'];

function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" color="default" variant="outlined">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, mr: 1 }}>
                        <Link href={'/'}>
                            <img src="/assets/images/MoHLog.png" alt="MoH KNHTS" width={'auto'} height={50} />
                        </Link>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left' }} open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' } }}>
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                                    <Link style={{ textDecoration: 'none', color: '#1651B6' }} href={page.link}>{page.name}</Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <Link href={'/'}>
                                <img src="/assets/images/MoHLog.png" alt="MoH KNHTS" width={'auto'} height={50} />
                            </Link>
                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, flexDirection: 'row', gap: 3 }}>
                            {pages.map((page) => (
                                <Link style={{ textDecoration: 'none', color: '#1651B6', fontSize: '1.1em' }} key={page.name} href={page.link}>{page.name}</Link>
                            ))}
                        </Box>
                    </Box>

                    <Box mx={2}>
                        <Link href={'/search'} style={{color: '#667', display: 'flex', alignItems: 'center'}}>
                            <SearchRounded />
                        </Link>
                    </Box>

                    {loggedIn ? (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}> <PersonTwoTone /> </IconButton>
                            </Tooltip>
                            <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Link href={'/'+setting.toLocaleLowerCase()}>{setting}</Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    ) : (
                        <Box sx={{ flexGrow: 0 }}>
                            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}> <PersonTwoTone /> </IconButton>
                                </Tooltip>
                                <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">Login</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">Request Account</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                            <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                                <Button sx={{ borderRadius: '3em', mr: 2, backgroundColor: '#1651B6' }} size='large' variant="contained" color="primary" href="/auth/login">Login</Button>
                                <Button sx={{ borderRadius: '3em' }} variant="outline" size='small' color="primary" href="/auth/register">Request Account</Button>
                            </Box>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default NavBar;
