import {useContext} from 'react'
import { GoogleLogin, useGoogleLogout } from 'react-google-login';
import axios from 'axios'
import {ReactComponent as GoogleSVG} from '../../assets/google.svg'
import { useHistory, Redirect } from 'react-router-dom'
import {refreshTokenSetup} from '../../utils/refreshToken.js'
import { UserContext } from '../../context/UserContext';
import TLButton from './TLButton.atom.js';
import GOOGLE_CLIENT_ID from '../../constants/GoogleClientId.constant'
import { loginButtonStyle } from '../../styles/Login.style.js';
import SvgIcon from '@mui/material/SvgIcon';
import ApiRoutes from '../../constants/ApiRoutes.constant';

function TLGoogleLoginButton (props) {
    const history = useHistory();
    const { user, setUser } = useContext(UserContext);

    const onLogoutSuccess = () => 
    {
        setUser({});
        // setRole({});
        // localStorage.clear();
        history.push('/login')
    }

    const onLogoutFailure = (response) => 
    {
        // console.log(response)
        alert('Failed to log out')
    }

    const {signOut} = useGoogleLogout({
        clientId: GOOGLE_CLIENT_ID,
        onLogoutSuccess,
        onLogoutFailure,
    })

    const onSuccess = (response) => 
    {
        // console.log(response)
        if(response.tokenId){
            axios.post(`${ApiRoutes.AUTH}/auth/signin`, {accessToken:response.accessToken || response.tokenObj.access_token})
            .then((result) => 
            {
                // console.log(result)
                if(result.data.payload==='USUARIO_NO_EXISTE'){
                    alert('No se encuentra registrado en el sistema, por favor contactese con un administrador')
                    signOut()
                }
                else if(result.data.payload==='USUARIO_SIN_PERMISOS'){
                    alert('Su usuario no tiene permisos, por favor contactese con un administrador')
                    signOut()
                }
                else{
                    axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.payload.authentication.accessToken}`;
                    setUser(result.data.payload.authentication)
                
                }

                // console.log(user);
                // console.log('USER CONTEXT: '+JSON.stringify(user))
                // console.log('LOCAL STORAGE: '+localStorage.getItem("user"))
                // console.log(role)
            });
            // console.log(user);
            // console.log('USER CONTEXT: '+JSON.stringify(user))
            // // localStorage.setItem("user",JSON.stringify(user));
            // console.log('LOCAL STORAGE: '+localStorage.getItem("user"))
            // console.log(user.role)

            refreshTokenSetup(response);
        }
    }

    const onFailure = (response) => {
        // console.log(response)
        alert('Error al hacer login')
    }

    if(user && user.accessToken){
        return <Redirect to={{pathname:'/',state:{referer:props.referer}}} />
    }

    // history.push('/rol');

  // if(role){
  //   // console.log(' ====> REFERER: ' ,props.referer)
  //   switch(role.permiso){
  //     case 'ESTUDIANTE':
  //       // history.push('/s/cc');
  //       // return <Redirect to='/s/cc' />
  //       return <Redirect to={props.referer && props.referer.pathname && props.referer.pathname!=='/' ? props.referer.pathname : '/s/cc'} />
  //       break;
  //     case 'DOCENTE':
  //       // history.push('/d/cc');
  //       // return <Redirect to='/d/cc' />
  //       return <Redirect to={props.referer && props.referer.pathname && props.referer.pathname!=='/' ? props.referer.pathname : '/d/cc'} />
  //       break;
  //     case 'ADMIN':
  //       // history.push('/admin');
  //       // return <Redirect to='/admin' />
  //       return <Redirect to={props.referer && props.referer.pathname && props.referer.pathname!=='/' ? props.referer.pathname : '/admin'} />
  //       break;
  //     case 'SUPERADMIN':
  //       // history.push('/superadmin');
  //       // return <Redirect to='/superadmin' />
  //       return <Redirect to={props.referer && props.referer.pathname && props.referer.pathname!=='/' ? props.referer.pathname : '/superadmin'} />
  //       break;
  //     default:
  //       break;
  //   }
  // }

  return (
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      render={renderProps => (
        <TLButton style={loginButtonStyle} label="Iniciar con Google" startIcon={<SvgIcon style={{height:'30px',width:'30px',marginRight:'16px'}}><GoogleSVG/></SvgIcon>} onClick={renderProps.onClick} disabled={renderProps.disabled}/>
      )}
      onSuccess={onSuccess}
      onFailure={onFailure}
      isSignedIn={true}
      cookiePolicy={'single_host_origin'}
      accessType={'offline'}
      responseType={'token,code'}
    />
  )
}

export default TLGoogleLoginButton;
