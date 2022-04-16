import React from 'react'
import {BrowserRouter, Switch , Route, Redirect } from "react-router-dom";

import Login from "../pages/Login";

import Usuarios from "../pages/Usuarios";
import Enfermedades from "../pages/Enfermedades";
import Farmacos from '../pages/Farmacos';
import Deportes from '../pages/Deportes';
import Alimentos from '../pages/Alimentos';
import Paises from '../pages/Paises';


import TLNavbar from "../components/organisms/TLNavbar.organism";
import TLDrawerNav from '../components/atoms/TLDrawerNav';

import { useMediaQuery } from '@mui/material';
import { createTheme} from '@mui/material/styles';






const Router = () => {

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 5000,
      },
    },
  });
  const hidden = useMediaQuery(theme.breakpoints.down('xl'))

  const [abrir, setAbrir] = React.useState(false);
  const [user, setUser] = React.useState(null);
  
  const accionAbrir = () => {
    console.log(abrir)
    setAbrir(!abrir)
  }

  return (
    <BrowserRouter>
    <React.Fragment>
      <TLNavbar accionAbrir={accionAbrir}/>    
      { hidden && < TLDrawerNav
        variant="temporary"
        open={abrir}
        onClose={accionAbrir}
        ModalProps={{
          keepMounted: true
        }}
        
      />}
      <Switch >
        <Route exact path="/" render={() => <Redirect  to="/enfermedades"/>}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/usuarios" component={Usuarios}/>
        <Route exact path="/enfermedades" component={Enfermedades}/>
        <Route exact path="/farmacos" component={Farmacos}/>
        <Route exact path="/deportes" component={Deportes}/>
        <Route exact path="/alimentos" component={Alimentos}/> 
        <Route exact path="/paises" component={Paises}/>
        
        
      </Switch >
      </React.Fragment>
    </BrowserRouter>
  );
}
  
export default Router;

