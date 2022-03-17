import React from 'react'
import {BrowserRouter, Switch , Route, Redirect } from "react-router-dom";


import Enfermedades from "../pages/Enfermedades";
import Farmacos from '../pages/Farmacos';
import Deportes from '../pages/Deporte';


import TLNavbar from "../components/organisms/TLNavbar.organism";
import TLDrawerNav from '../components/atoms/TLDrawerNav';

import { useMediaQuery } from '@mui/material';
import { createTheme} from '@mui/material/styles';
import Alimentos from '../pages/Alimento';





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
        <Route exact path="/enfermedades" component={Enfermedades}/>
        <Route exact path="/farmacos" component={Farmacos}/>
        <Route exact path="/deportes" component={Deportes}/>
        <Route exact path="/alimentos" component={Alimentos}/>
        
        
      </Switch >
      </React.Fragment>
    </BrowserRouter>
  );
}
  
export default Router;

