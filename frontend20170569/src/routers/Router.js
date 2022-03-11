import {BrowserRouter, Switch , Route, Redirect } from "react-router-dom";
import Enfermedades from "../pages/Enfermedades";

const Router = () => {

    return (
      <BrowserRouter>
        <Switch >
          <Route exact path="/" render={() => <Redirect  to="/enfermedades"/>}/>
          <Route exact path="/enfermedades" component={Enfermedades}/>
        </Switch >
      </BrowserRouter>
    );
  }
  
  export default Router;