import {useContext} from 'react'
import { GoogleLogin, useGoogleLogout } from 'react-google-login';
import axios from 'axios'
import {ReactComponent as GoogleSVG} from '../../assets/google.svg'
import { useHistory, Redirect } from 'react-router-dom'
import {refreshTokenSetup} from '../../utils/refreshToken.js'
import { UserContext } from '../../context/UserContext';
import TLButton from './TLButton.atom.js';
import GOOGLE_CLIENT_ID from '../../constants/GoogleClientId.constant'
import SvgIcon from '@mui/material/SvgIcon';
import { LoginButtonStyle, LoginBackground, LoginContainer, Logo } from '../../styles/Login.style.js';
import url from "../../config";
import { t } from 'i18next';

function TLGoogleLoginButton (props) {
    const history = useHistory();
    const { user, setUser } = useContext(UserContext);

    const onLogoutSuccess = () => 
    {
        setUser({});
        history.push('/login')
    }

    const onLogoutFailure = (response) => 
    {
        alert('Failed to log out')
    }

    const {signOut} = useGoogleLogout({
        clientId: GOOGLE_CLIENT_ID,
        onLogoutSuccess,
        onLogoutFailure,
    })

    const onSuccess = (response) => 
    {
        console.log(response)
        if(response.tokenId){
            axios.post(`${url}login/auth`, {accessToken:response.tokenId})
            .then((result) => 
            {
                console.log(result.data);
                if(result.data.message==='No se encontró al usuario'){
                    alert('No se encuentra registrado en el sistema, por favor contactese con un administrador')
                    signOut()
                }
                else{
                    //axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.payload.authentication.accessToken}`;
                    setUser(
                        result.data.payload
                      )
                }
                console.log(user)

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

            //refreshTokenSetup(response);
        }
    }

    const onFailure = (response) => {
        // console.log(response)
        alert('Error al hacer login')
    }

    if(user && user.idUsuario){
        return <Redirect to={{pathname:'/',state:{referer:props.referer}}} />
    }

 

  return (
    <GoogleLogin
        clientId={GOOGLE_CLIENT_ID}
        render={renderProps => (
        <TLButton style={LoginButtonStyle} label={t("IniciarGoogle")} startIcon={<SvgIcon style={{height:'30px',width:'30px',marginRight:'16px'}}><GoogleSVG/></SvgIcon>} onClick={renderProps.onClick} disabled={renderProps.disabled}/>
        )}
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn = {true}
        cookiePolicy={'single_host_origin'}
        accessType={'offline'}
        responseType={'token,code'}
    />
  )
}

export default TLGoogleLoginButton;
