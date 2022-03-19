import { useState } from 'react';

import { LoginButtonStyle, LoginBackground, LoginContainer, Logo } from '../styles/Login.style.js';

import GoogleLogin from 'react-google-login';
import GOOGLE_CLIENT_ID from '../constants/GoogleClientId.constant';

import {ReactComponent as GoogleSVG} from '../assets/google.svg'
import logoPUCP from '../assets/LogoPucp.jpg'
import loginBackground from '../assets/loginBackground.png'
import TLButton from '../components/atoms/TLButton.atom';
import TLGoogleLoginButton from '../components/atoms/TLGoogleLoginButton.atom';
import { SvgIcon, Typography } from '@mui/material';

/*




*/

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Login = (props) => {
  //const [loginData, setLoginData] = useState(localStorage.getItem('loginData') ? null :  null);
  const referer = (props.location && props.location.state && props.location.state.referer) ? props.location.state.referer : '/';

  /*const handleFailure = (result) => {
    alert(result)
  }

  const handleLogin = (googleData) => {
    setLoginData(googleData)
    localStorage.setItem('loginData', googleData);
    console.log(googleData)
  }
  

  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setLoginData(null);
  }*/

  return (
    //<div style={{display:'flex', height: 'calc(100vh - 64px)', backgroundImage: {loginBackground} }}>
      <Grid container alignItems = 'center' justifyContent = 'center'
          sx={{
            display: 'flex', 
            height: 'calc(100vh - 64px)',
            backgroundImage: `url(${loginBackground})`,
            backgroundSize: 'cover', 
            backgroundPosition: 'center'
          }}
        >
        <Grid item xs={4} sx ={{backgroundColor: '#F5F5F5', margin: 4}}>
          <Grid container component="form" noValidate sx={{ mt: 1 }} alignItems = 'center' direction = 'column'> 
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <TLGoogleLoginButton referer={referer} />
                
            

            
          </Grid>
        </Grid>
      </Grid>

      
    //</div>
  );
};

export default Login;


/*<LoginBackground/>
      <LoginContainer>
        {/*<Logo alt="Logo-Universidad" src={logoPUCP}/>
        <Typography style={{color:'white',fontSize:'1.5rem',fontWeight:500}} >Bienvenido/a!</Typography>
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          render={renderProps => (
            <TLButton style={LoginButtonStyle} label="Iniciar con Google" startIcon={<SvgIcon style={{height:'30px',width:'30px',marginRight:'16px'}}><GoogleSVG/></SvgIcon>} onClick={renderProps.onClick} disabled={renderProps.disabled}/>
          )}
          onSuccess={handleLogin}
          onFailure={handleFailure}
          isSignedIn = {true}
          cookiePolicy={'single_host_origin'}
          accessType={'offline'}
          responseType={'token,code'}
        />
          </LoginContainer>*/