import React from 'react';
import { Link } from "react-router-dom";
import { useContext } from 'react';

//Material
import { makeStyles } from '@mui/styles';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { UserContext } from "../../context/UserContext";
import AlarmIcon from '@mui/icons-material/Alarm';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import TimelineIcon from '@mui/icons-material/Timeline';
import BuildIcon from '@mui/icons-material/Build';



import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import MedicationIcon from '@mui/icons-material/Medication';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BlockIcon from '@mui/icons-material/Block';

import {t} from 'i18next';

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

const TLListNav = () => {
  const classes = useStyles();
  const {user, setUser} = useContext(UserContext)
  return (
    <div>
      <List component='nav'>
        {user.rol && user.rol.idRol === 1 && <ListItem button component={Link} to={"/usuarios"}>
          <ListItemIcon className={classes.button} color="inherit">
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary={t('Usuarios')}/>
        </ListItem>}

        {user.rol && user.rol.idRol === 1 && <ListItem button component={Link} to={"/enfermedades"}>
          <ListItemIcon className={classes.button} color="inherit">
            <CoronavirusIcon />
          </ListItemIcon>
          <ListItemText primary={t('Enfermedades')}/>
        </ListItem>}

        {user.rol && user.rol.idRol === 1 && <ListItem button component={Link} to={"/farmacos"}>
          <ListItemIcon className={classes.button} color="inherit">
            <MedicationIcon />
          </ListItemIcon>
          <ListItemText primary={t('Farmacos')}/>
        </ListItem>}

        {user.rol && user.rol.idRol === 1 && <ListItem button component={Link} to={"/deportes"}>
          <ListItemIcon className={classes.button} color="inherit">
            <SportsBasketballIcon />
          </ListItemIcon>
          <ListItemText primary={t('Deportes')}/>
        </ListItem>}

        {user.rol && user.rol.idRol === 1 && <ListItem button component={Link} to={"/alimentos"}>
          <ListItemIcon className={classes.button} color="inherit">
            <RestaurantIcon />
          </ListItemIcon>
          <ListItemText primary={t('Alimentos')}/>
        </ListItem>}

        {user.rol && user.rol.idRol === 1 &&<ListItem button component={Link} to={"/paises"}>
          <ListItemIcon className={classes.button} color="inherit">
            <LanguageIcon />
          </ListItemIcon>
          <ListItemText primary={t('Paises')}/>
        </ListItem>}

        {user.rol && user.rol.idRol === 1 &&<ListItem button component={Link} to={"/estudios"}>
          <ListItemIcon className={classes.button} color="inherit">
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary={t('Estudios')}/>
        </ListItem>}

        {user.rol && user.rol.idRol === 2 && <ListItem button component={Link} to={"/estudiosAsignados"}>
          <ListItemIcon className={classes.button} color="inherit">
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary={t('EstudiosAsignados')}/>
        </ListItem>}

        
        {user.rol && user.rol.idRol === 3 && user.aprobado === false && <ListItem button component={Link} to={"/confidencialidad"}>
          <ListItemIcon className={classes.button} color="inherit">
            <LockIcon />
          </ListItemIcon>
          <ListItemText primary={t('Confidencialidad')}/>
        </ListItem>}
        
        {user.rol && user.rol.idRol === 3 && <ListItem button component={Link} to={"/perfil"}>
          <ListItemIcon className={classes.button} color="inherit">
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary='Mi Perfil'/>
        </ListItem>}

        {user.rol && user.rol.idRol === 3 &&<ListItem button component={Link} to={"/estudiosParticipando"}>
          <ListItemIcon className={classes.button} color="inherit">
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary={t('Estudios')}/>
        </ListItem>}


        {user.rol && user.rol.idRol === 3 && <ListItem button component={Link} to={"/retiro"}>
          <ListItemIcon className={classes.button} color="inherit">
            <BlockIcon />
          </ListItemIcon>
          <ListItemText primary='Retiro del sistema'/>
        </ListItem>}
        {/*<ListItem button component={Link} to={"/averias"}>
          <ListItemIcon className={classes.button} color="inherit">
            <AlarmIcon />
          </ListItemIcon>
          <ListItemText primary='Aver??as'/>
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
          <ListItemText primary='Simulaci??n'/>
        </ListItem>

        <ListItem button component={Link} to={"/parametros"}>
          <ListItemIcon className={classes.button} color="inherit">
            <BuildIcon />
          </ListItemIcon>
          <ListItemText primary='Par??metros'/>
        </ListItem>

        <ListItem button component={Link} to={"/miperfil"}>
          <ListItemIcon className={classes.button} color="inherit">
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary='Mi Perfil'/>
  </ListItem>*/}
      </List>
    </div>
  );
}

export default TLListNav;