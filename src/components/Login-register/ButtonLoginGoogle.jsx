import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";
import { postTokenGoogle } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const client = '9520948127-j0qckaqvur9flrfh6iq4fcec4p4te2t4.apps.googleusercontent.com';

const ButtonLoginGoogle = () => {
  const loading = useSelector((state) => state.loadingPostTokenGoogle);
  const error = useSelector((state) => state.errorPostTokenGoogle);
  const success = useSelector((state) => state.successPostTokenGoogle);
  const dataUser = useSelector((state) => state.dataUser);
  const messageGoogle = useSelector((state) => state.messageGoogle);

  const [message, setMessage] = useState('');

  const dispatch = useDispatch(); 

  useEffect(() => {
    setMessage(messageGoogle);
  }, [messageGoogle]);

  const handleSuccess = async (credentialResponse) => {
    if (credentialResponse.credential) {
      const token = credentialResponse.credential;

      try {
        dispatch(postTokenGoogle(token)); 
      } catch (error) {
        console.error("Error al enviar el token al servidor:", error);
      }
    }
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
       {message && message.length > 1 && (
          <p>{message}</p>
      )}

      { error && (
        <p>{error}</p>
      )}
    </GoogleOAuthProvider>
  );
}

export default ButtonLoginGoogle;