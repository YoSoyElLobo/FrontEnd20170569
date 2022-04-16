import * as React from 'react';
import { useContext } from 'react';
import { useGoogleLogout } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import i18next from 'i18next'
import GOOGLE_CLIENT_ID from '../../constants/GoogleClientId.constant'

import TLIconButton from '../atoms/TLIconButton.atom';
import TLSelection from '../atoms/TLSelection.atom';

//Mui
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { UserContext } from "../../context/UserContext";
import { useMediaQuery } from '@mui/material';


import { useTranslation} from 'react-i18next';
import cookies from 'js-cookie'

const lenguajes = [
  {
    id: '1',
    codigo: 'es',
    nombre: 'ES'
  }, 
  {
    id: '2',
    codigo: 'en',
    nombre: 'EN'
  }
]

const TLNavbar = ({accionAbrir}) => {

  
  const history = useHistory();
  const {user, setUser} = useContext(UserContext);
  const {t, i18n} = useTranslation();



  const onLogoutSuccess = () => {
    setUser({});
    // setRole({});
    // localStorage.clear();
    history.push('/login')
  }
  const onLogoutFailure = (response) => {
    // console.log(response)
      alert('Failed to log out')
  }

  const {signOut} = useGoogleLogout({
    clientId: GOOGLE_CLIENT_ID,
    onLogoutSuccess,
    onLogoutFailure,
  });

  const handleSelection = e => {
    
    const {value} = e.target;
    if (value == 1)
      i18n.changeLanguage('es')
    else
      i18n.changeLanguage('en')
    //refresh
    //window.location.reload(true);    
  }

  return (
    
    <AppBar position="static">
      <Toolbar>
        
        {user.idUsuario && 
          <TLIconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => accionAbrir()}
          >
            <MenuIcon />
          </TLIconButton>}
        <Grid item xs={1}>
          <TLSelection 
              label="Idioma"
              name="Idioma"
              menuItems={lenguajes}
              ninguno = {false}
              //value={i18n.language}
              onChange={handleSelection}
              //defaultValue = {i18n.language}
              //error={errors.rol}
          />
        </Grid>
        <Typography align = 'center' variant="h4" component="div" sx={{ flexGrow: 1, fontWeight:'bold'}}>
          NOMSIS
        </Typography>
        

        <TLIconButton edge="start" color="inherit" aria-label="exit" onClick={() => signOut()}>
            <ExitToAppIcon />
        </TLIconButton>
      </Toolbar>
    </AppBar>
    
  );
}

export default TLNavbar;



