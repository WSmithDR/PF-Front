import { useState } from "react";
import Register from "../Login-register/Register/Register";
import Login from "../Login-register/Login/Login";
import ButtonLoginGoogle from "./ButtonLoginGoogle";
import LOGO from "../../assets/images/LOGO.jpg"

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
      <div className="flex justify-center">
      <img src={LOGO} alt="Logo" />
      </div>
      <div className="flex items-center justify-center mt-0">

      
        <button className="bg-blue-500  hover:bg-orange px-10 py-4 rounded-lg mx-2 min-w-[220px]  h-[80px] text-[20px] text-white font-thin flex items-center justify-center" onClick={handleToggleRegister}>
          {showRegister ? "Cerrar Registro" : "Registrarse"}
        </button>
        <button className="bg-blue-500  hover:bg-orange px-5 py-4 rounded-lg mx-2 min-w-[220px]  h-[80px]  text-[20px] text-white font-thin flex items-center justify-center"  onClick={handleToggleLogin}>
          {showLogin ? "Cerrar Inicio de Sesión" : "Inicio de Sesión"}
        </button>
      </div>

      {showRegister && <Register />}
      {showLogin && <Login />}

      <div classname="relative py-6">
        <div classname="absolute inset-0 flex items-center">
          <div classname="w-full border-b border-gray-900 m-5"></div>
        </div>
        <div classname="relative flex justify-center">
          <span classname="bg-white px-4 text-sm text-gray-500">Continuar con</span>
        </div>
      </div>

      <div className="flex items-center justify-center">
        <ButtonLoginGoogle />
      </div>
    </div>
  );
}
export default LoginRegister;
