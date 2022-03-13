import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Divider } from '@mui/material';
import TLListNav from './TLListNav.atom';
import { makeStyles } from '@mui/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
}));

const TLDrawerNav = ({variant, open, onClose, ...other}) => {
  const classes = useStyles();

  return (
    <Drawer 
        className={classes.drawer} 
        classes={{
        paper: classes.drawerPaper,
        }}
      anchor="left"
      variant= {variant}
      open= {open}
      onClose={onClose ? onClose : null}
      {...other}
    >
      <div sx={classes.toolbar}></div>
      <Divider />
      <TLListNav />
    </Drawer>
  );
}

export default TLDrawerNav;
