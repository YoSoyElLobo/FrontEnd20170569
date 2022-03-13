import React from 'react'
import {BrowserRouter, Switch , Route, Redirect } from "react-router-dom";


import Enfermedades from "../pages/Enfermedades";
import TLNavbar from "../components/organisms/TLNavbar.organism";
import TLDrawerNav from '../components/atoms/TLDrawerNav';

import { Hidden } from '@mui/material';
import Farmacos from '../pages/Farmacos';

const Router = () => {

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
      {/*<Hidden xlDown>
        <TLDrawerNav
          variant="permanent"
          open={true}
        />
  </Hidden>*/}
      <Hidden xlUp>
        <TLDrawerNav
          variant="temporary"
          open={abrir}
          onClose={accionAbrir}
          ModalProps={{
            keepMounted: true
          }}
        />
      </Hidden>
      <Switch >
        <Route exact path="/" render={() => <Redirect  to="/enfermedades"/>}/>
        <Route exact path="/enfermedades" component={Enfermedades}/>
        <Route exact path="/farmacos" component={Farmacos}/>
        
        
      </Switch >
      </React.Fragment>
    </BrowserRouter>
  );
}
  
export default Router;

