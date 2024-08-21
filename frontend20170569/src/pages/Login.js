import { useState } from 'react';

import loginBackground from '../assets/loginBackground.png'
import TLGoogleLoginButton from '../components/atoms/TLGoogleLoginButton.atom';
import Typography  from '@mui/material/Typography';



import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { t } from 'i18next';

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
        <Grid item xs={4} sx ={{backgroundColor: '#F5F5F5', margin: 4, borderRadius: '16px', maxWidth: '480px !important' }}>
          <Grid container component="form" noValidate sx={{ gap: '10px', p: '10px'}} alignItems = 'center' direction = 'column'> 
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t('IniciaSesion')}
            </Typography>
            <TLGoogleLoginButton referer={referer} sx = {{ my: '10px'}} />
                
            

            
          </Grid>
        </Grid>
      </Grid>

      
    //</div>
  );
};

export default Login;

