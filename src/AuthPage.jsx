import React, { useEffect } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

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

  const onSuccess = (response) => {
    console.log("SUCCESS", response);
    window.location.assign("https://pias.uy/buscar-gif");
  };
  const onFailure = (response) => {
    console.log("FAILED", response);
  };
  const onLogoutSuccess = () => {
    console.log("SUCESS LOG OUT");
  };

  return (
    <div>

      <GoogleLogin
        clientId={
          "842322570073-kn7h3v5i6rhuinbbuhq6rmlrovf1bkpc.apps.googleusercontent.com"
        }
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
      <br /> <br />
      <GoogleLogout
        clientId={
          "842322570073-kn7h3v5i6rhuinbbuhq6rmlrovf1bkpc.apps.googleusercontent.com"
        }
        onLogoutSuccess={onLogoutSuccess}
      />
    </div>
  );
}

export default AuthPage;
