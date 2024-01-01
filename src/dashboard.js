import React, { useEffect, useState } from 'react';
import './index.css';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Chart from './chart';
import CountUp from 'react-countup';


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

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

export default function Dashboard() {
    const [destinationList, setDestinationList] = useState('');
    const [numberOfDestinations, setNumberOfDestinations] = useState('');
    const [totalSpent, setTotalSpent] = useState('');

    useEffect(() => {
        fetch('/topFiveDestinations')
            .then(response => response.json())
            .then(destinationList => setDestinationList(destinationList))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        fetch('/numberOfDestinations')
            .then(response => response.json())
            .then(numberOfDestinations => setNumberOfDestinations(numberOfDestinations))
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        fetch('/totalSpent')
            .then(response => response.json())
            .then(totalSpent => setTotalSpent(totalSpent))
            .catch(error => console.error(error));
    }, []);

    const topFive = () => {
        if (destinationList.length === 0) {
            return <p>cannot find destination list</p>;
        } else {
            return (
                <List>
                    {destinationList.map((hotelName, index) => (
                        <ListItem disablePadding
                            key={index}>{hotelName}</ListItem>
                    ))}
                </List>

            );
        }
    };

    const destinationCount = () => {
        if (numberOfDestinations) {
            console.log(numberOfDestinations, "number of destinations")
            return <CountUp
                end={numberOfDestinations}
                duration={5}
            />

        } else {
            return <p>cannot find destination count</p>;
        }
    }

    const totalSpentCounter = () => {
        if (totalSpent) {
            return <CountUp
                end={totalSpent}
                duration={5}
            />

        } else {
            return <p>cannot find total spent</p>;
        }
    }


    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Holiday Dashboard
                        </Typography>
                    </Toolbar>
                </AppBar>
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
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <Divider sx={{ my: 1 }} />

                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }} >
                        <Grid container spacing={3}>
                            {/* booking times chart */}
                            <Grid item xs={12} md={8} lg={9} className="TimeToBookChart">
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 340,
                                    }}
                                >
                                    <Chart />
                                </Paper>
                            </Grid>
                            {/* nuumber of destinations + total spent */}
                            <Grid item xs={12} md={4} lg={3} className="numberOfDestinations">
                                <Paper className='totalsBlock'
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: 340,
                                    }}
                                >
                                    <span className="counterText">
                                        <Typography component="h2" variant="h6" color="primary" gutterBottom>Unique Destinations</Typography>
                                        {destinationCount()}
                                    </span>
                                    <span className='totalText'>
                                        <Typography component="h2" variant="h6" color="primary" gutterBottom>Total spent on trips</Typography>
                                        £{totalSpentCounter()}
                                    </span>
                                </Paper>
                            </Grid>

                            {/* Top 5 */}
                            <Grid item xs={12} className="top5Container">
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <Typography component="h2" variant="h6" color="primary" gutterBottom>Top Five Destinations</Typography>
                                    {topFive()}
                                </Paper>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright ©   Olivias Holiday search breakdown '}

            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}