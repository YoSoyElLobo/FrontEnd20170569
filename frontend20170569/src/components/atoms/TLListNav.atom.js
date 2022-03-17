import React from 'react';
import { Link } from "react-router-dom";

//Material
import { makeStyles } from '@mui/styles';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import RoomIcon from '@mui/icons-material/Room';
import GroupIcon from '@mui/icons-material/Group';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import BlockIcon from '@mui/icons-material/Block';
import AlarmIcon from '@mui/icons-material/Alarm';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import TimelineIcon from '@mui/icons-material/Timeline';
import BuildIcon from '@mui/icons-material/Build';
import PersonIcon from '@mui/icons-material/Person';


import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import MedicationIcon from '@mui/icons-material/Medication';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

const TLListNav = () => {
  const classes = useStyles();

  return (
    <div>
      <List component='nav'>
        <ListItem button component={Link} to={"/enfermedades"}>
          <ListItemIcon className={classes.button} color="inherit">
            <CoronavirusIcon />
          </ListItemIcon>
          <ListItemText primary='Enfermedades'/>
        </ListItem>

        <ListItem button component={Link} to={"/farmacos"}>
          <ListItemIcon className={classes.button} color="inherit">
            <MedicationIcon />
          </ListItemIcon>
          <ListItemText primary='Fármacos'/>
        </ListItem>

        <ListItem button component={Link} to={"/deportes"}>
          <ListItemIcon className={classes.button} color="inherit">
            <SportsBasketballIcon />
          </ListItemIcon>
          <ListItemText primary='Deportes'/>
        </ListItem>

        <ListItem button component={Link} to={"/alimentos"}>
          <ListItemIcon className={classes.button} color="inherit">
            <RestaurantIcon />
          </ListItemIcon>
          <ListItemText primary='Alimentos'/>
        </ListItem>

        <ListItem button component={Link} to={"/bloqueos"}>
          <ListItemIcon className={classes.button} color="inherit">
            <BlockIcon />
          </ListItemIcon>
          <ListItemText primary='Bloqueos'/>
        </ListItem>

        <ListItem button component={Link} to={"/averias"}>
          <ListItemIcon className={classes.button} color="inherit">
            <AlarmIcon />
          </ListItemIcon>
          <ListItemText primary='Averías'/>
        </ListItem>

        <ListItem button component={Link} to={"/reportes"}>
          <ListItemIcon className={classes.button} color="inherit">
            <EqualizerIcon />
          </ListItemIcon>
          <ListItemText primary='Reportes'/>
        </ListItem>

        <ListItem button component={Link} to={"/simulacion"}>
          <ListItemIcon className={classes.button} color="inherit">
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary='Simulación'/>
        </ListItem>

        <ListItem button component={Link} to={"/parametros"}>
          <ListItemIcon className={classes.button} color="inherit">
            <BuildIcon />
          </ListItemIcon>
          <ListItemText primary='Parámetros'/>
        </ListItem>

        <ListItem button component={Link} to={"/miperfil"}>
          <ListItemIcon className={classes.button} color="inherit">
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary='Mi Perfil'/>
        </ListItem>
      </List>
    </div>
  );
}

export default TLListNav;