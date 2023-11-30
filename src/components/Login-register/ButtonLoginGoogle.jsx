import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"
import { useState } from "react";
import axios from "axios";

const client = '9520948127-j0qckaqvur9flrfh6iq4fcec4p4te2t4.apps.googleusercontent.com';
const url = 'http://localhost:3001';

const ButtonLoginGoogle = () => {
  const [authResult, setAuthResult] = useState(null);

  const handleSuccess = async (credentialResponse) => {
    if (credentialResponse.credential) {
      const token = credentialResponse.credential;

      try {
        const response = await sendTokenToServer(token);
        setAuthResult(response);
      } catch (error) {
        console.error("Error al enviar el token al servidor:", error);
      }
    }
  };

  const sendTokenToServer = async (token) => {
    try {
      const response = await axios.post(`${url}/user/auth`, { token });
    } catch (error) {
      console.error("Error al enviar el token al servidor:", error);
    };
  };

  const handleError = () => {
    console.log("Login failed");
  };

  return (
    <GoogleOAuthProvider clientId={client}>
      <GoogleLogin 
        onSuccess={handleSuccess}
        onError={handleError}
        theme="filled_black"
        size="melarge"
        locale="es"
        width='550px'
      />
    </GoogleOAuthProvider>
  )
}

export default ButtonLoginGoogle;