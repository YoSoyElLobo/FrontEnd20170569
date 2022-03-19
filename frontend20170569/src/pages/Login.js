import { useState } from 'react';

import loginBackground from '../assets/loginBackground.png'
import TLGoogleLoginButton from '../components/atoms/TLGoogleLoginButton.atom';
import Typography  from '@mui/material/Typography';



import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

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

