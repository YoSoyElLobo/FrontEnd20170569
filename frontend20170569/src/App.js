//import logo from './logo.svg';
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider as ThemeMaterial} from '@mui/material/styles';
import { ThemeProvider as ThemeStyled} from 'styled-components';
import theme from './styles/theme';
import CssBaseline from "@mui/material/CssBaseline";
//import './App.css';
import Router from './routers/Router';
import { UserProvider } from './context/UserContext';



function App() {
  //const {t} = useTranslation();
  return (
    <ThemeMaterial theme = {theme}>
      <CssBaseline />
      <ThemeStyled theme = {theme}>
        <UserProvider>
          <Router />
        </UserProvider>
      </ThemeStyled>
    </ThemeMaterial>
  );
  
  

}

export default App;
