//import logo from './logo.svg';
import React from 'react';
import { ThemeProvider as ThemeMaterial} from '@mui/material/styles';
import { ThemeProvider as ThemeStyled} from 'styled-components';
import theme from './styles/theme';
import CssBaseline from "@mui/material/CssBaseline";
//import './App.css';
import Router from './routers/Router';



function App() {
  return (
    <ThemeMaterial theme = {theme}>
      <CssBaseline />
      <ThemeStyled theme = {theme}>
        <Router />
      </ThemeStyled>
    </ThemeMaterial>
  );
  
  
  
  
  /*return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );*/
}

export default App;
