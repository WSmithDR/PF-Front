import { useState } from "react";
import Register from "../Login-register/Register/Register";
import Login from "../Login-register/Login/Login";

function LoginRegister() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleToggleRegister = () => {
    setShowRegister(!showRegister);
    setShowLogin(false);
  };

  const handleToggleLogin = () => {
    setShowLogin(!showLogin);
    setShowRegister(false);
  };

  return (
    <div>
      <div className="flex justify-center h-[250px] pt-5">
      <img src="Logo" alt="Logo" />
      </div>
      <div className="flex items-center justify-center mt-5">

      
        <button className="bg-blue-500  hover:bg-orange px-10 py-4 rounded-lg mx-2 min-w-[220px]  h-[80px] text-[20px] text-white font-thin flex items-center justify-center" onClick={handleToggleRegister}>
          {showRegister ? "Cerrar Registro" : "Registrarse"}
        </button>
        <button className="bg-blue-500  hover:bg-orange px-5 py-4 rounded-lg mx-2 min-w-[220px]  h-[80px]  text-[20px] text-white font-thin flex items-center justify-center"  onClick={handleToggleLogin}>
          {showLogin ? "Cerrar Inicio de Sesión" : "Inicio de Sesión"}
        </button>
      </div>

      {showRegister && <Register />}
      {showLogin && <Login />}
    </div>
  );
}
export default LoginRegister;
