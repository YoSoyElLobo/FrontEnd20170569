import * as React from 'react';
import { useContext } from 'react';

import TLIconButton from '../atoms/TLIconButton.atom';

//Mui
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { UserContext } from "../../context/UserContext";
import { useMediaQuery } from '@mui/material';


const TLNavbar = ({accionAbrir}) => {
  const {user} = useContext(UserContext);
  

  return (
    
    <AppBar position="static">
      <Toolbar>
        {user!=null && 
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
        <Typography align = 'center' variant="h4" component="div" sx={{ flexGrow: 1, fontWeight:'bold'}}>
          NOMSIS
        </Typography>

        <TLIconButton edge="start" color="inherit" aria-label="exit" onClick={() => console.log(user)}>
            <ExitToAppIcon />
        </TLIconButton>
      </Toolbar>
    </AppBar>
    
  );
}

export default TLNavbar;



