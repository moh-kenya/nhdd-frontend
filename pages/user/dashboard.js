// import { ThemeProvider } from "@emotion/react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import { ChevronLeft, People } from "@mui/icons-material";
import { Box, CssBaseline, Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Paper, Toolbar, Container, Grid} from "@mui/material";
import React, {useState} from "react";
import MuiDrawer from '@mui/material/Drawer'
import InboxIcon from '@mui/icons-material/Inbox'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import Users from './users';
import Inbox from './inbox';
import VerifyConceptsComponent from '@/pages/user/verifyConcepts';
import Copyright from '../../components/Copyright';

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);
const defaultTheme = createTheme();
export default function Dashboard(params) {
  const [open, setOpen] = useState(true);
  const [component, SetComponent] = useState('inbox')
    const toggleDrawer = () => {
        setOpen(!open);
  };
  return(
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeft />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {/* {mainListItems} */}
            <ListItemButton onClick={()=> SetComponent('inbox')}>
             <ListItemIcon>
              <InboxIcon />
             </ListItemIcon>
             <ListItemText primary='Inbox'/>
            </ListItemButton>
            <ListItemButton onClick={()=> SetComponent('users')} >
             <ListItemIcon>
              <People />
             </ListItemIcon>
             <ListItemText primary='New Users'/>
            </ListItemButton>
            <ListItemButton onClick={()=> SetComponent('concepts')}>
             <ListItemIcon>
              <LibraryBooksIcon />
             </ListItemIcon>
             <ListItemText primary='New Concepts'/>
            </ListItemButton>
          </List>
          <Divider />
        </Drawer>
        <Box component='main' sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}>
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 0, mb: 4 }}>
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              {
                component === 'inbox' ? 
                <Inbox />
                :
                component === 'users' ?
                 <Users />
                :
                <VerifyConceptsComponent />
      
              }
              </Paper>
            </Grid>
            <Copyright />
          </Container>
        </Box>
      
        </Box>
      </ThemeProvider>
  )
}
