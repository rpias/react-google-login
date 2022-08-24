import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";
import LoginIcon from '@mui/icons-material/Login';
import InputIcon from '@mui/icons-material/Input';

function AuthPage() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "842322570073-kn7h3v5i6rhuinbbuhq6rmlrovf1bkpc.apps.googleusercontent.com",
        scope: "email",
      });
    }
    gapi.load("client:auth2", start);
  }, []);

  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);

  const onSuccess = (response) => {
    console.log("SUCCESS", response);
    setUser(response);
    setIsLogin(true);
    // window.location.assign("https://pias.uy/buscar-gif");
  };
  const onFailure = (response) => {
    console.log("FAILED", response);
  };
  const onLogoutSuccess = () => {
    console.log("SUCESS LOG OUT");
    setUser({});
    setIsLogin(false);
  };

  return (
    <div>
      <GoogleLogin
        clientId={
          "842322570073-kn7h3v5i6rhuinbbuhq6rmlrovf1bkpc.apps.googleusercontent.com"
        }
        render={(renderProps) => (
          <Button
            startIcon={<LoginIcon />}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            variant="contained"
          >
            Loguearse
          </Button>
        )}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
      <br /> <br />
      <GoogleLogout
        clientId={
          "842322570073-kn7h3v5i6rhuinbbuhq6rmlrovf1bkpc.apps.googleusercontent.com"
        }
        render={(renderProps) => (
          <Button
            startIcon={<InputIcon />}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            variant="contained"
          >
            Salir
          </Button>
        )}
        onLogoutSuccess={onLogoutSuccess}
      />
      <div>
        {isLogin && <h2>{user.profileObj.name}</h2>}
        {isLogin && <h3>{user.profileObj.email}</h3>}
        {isLogin && <h3>{user.profileObj.googleId}</h3>}
        {isLogin && <img src={user.profileObj.imageUrl} alt="" />}
      </div>
      <div>{!isLogin && <h2>No hay nadie logueado</h2>}</div>
    </div>
  );
}

export default AuthPage;
