import { useState } from "react";
import { useDispatch } from "react-redux";
import { form_style, div_style, button_disabledStyle, button_style, label_style, input_style, divButtons_style } from "./tailwindStylesLogin";
import closureHandleChange from "./Handles/closureHandleChange";
import closureHandleLogin from "./Handles/closureHandleLogin";

const Login = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [msg, setMsg] = useState('');
  const handleChange = closureHandleChange(userData, setUserData, setErrors, setIsButtonDisabled);
  const handleLogin = closureHandleLogin(dispatch, userData, setMsg);
  return (
    <div>
      <form className={form_style}>
        <div className={div_style}>
          <label className={label_style}>Correo electrónico: </label>
          <input
            className={input_style}
            name='email'
            placeholder=' Ingrese su email'
            value={userData.email}
            onChange={handleChange} />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div className={div_style}>
          <label className={label_style}>Contraseña: </label>
          <input
            className={input_style}
            name='password'
            type='password'
            placeholder=' Ingrese su contraseña'

            value={userData.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <div className={divButtons_style}>
          <button
            className={!isButtonDisabled ? button_disabledStyle : button_style}
            name='User'
            type="submit"
            onClick={handleLogin}
            disabled={isButtonDisabled}
          >
            Iniciar Sesion
          </button>
        </div>
        {msg && <p className={label_style}>{msg}</p>}
      </form>
    </div>
  );
};
export default Login;
