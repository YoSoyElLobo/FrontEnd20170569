/*import React from 'react';
import { makeStyles } from '@mui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('xl')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    [theme.breakpoints.up('xl')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
}));

const TLNavbar = ({accionAbrir}) => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} style={{ background: '#00467E' }}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => accionAbrir()}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h5" className={classes.title}>
          PaqHoy
        </Typography>
        <Link
          to="/login"
          style={{ textDecoration: "none" }}
          color="inherit"
          onClick={()=> window.localStorage.clear()}
        >
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="exit">
            <ExitToAppIcon />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default TLNavbar;*/

import * as React from 'react';

import TLIconButton from '../atoms/TLIconButton.atom';

//Mui
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


const TLNavbar = ({accionAbrir}) => {
  return (
    
    <AppBar position="static">
      <Toolbar>
        <TLIconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={() => accionAbrir()}
        >
          <MenuIcon />
        </TLIconButton>
        <Typography align = 'center' variant="h4" component="div" sx={{ flexGrow: 1, fontWeight:'bold'}}>
          NOMSIS
        </Typography>

        <TLIconButton edge="start" color="inherit" aria-label="exit">
            <ExitToAppIcon />
        </TLIconButton>
      </Toolbar>
    </AppBar>
    
  );
}

export default TLNavbar;



