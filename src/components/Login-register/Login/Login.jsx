import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { h1_style, button_disabledStyle, button_style, label_style, input_style, divButtons_style } from "./tailwindStylesLogin";
import validation from '../../../utils/Validation/ValidationLogin';
import { postLogin } from "../../../redux/actions";

const Login = () => {
  const loadingPostLogin = useSelector(state => state.loadingPostLogin);
  const error = useSelector(state => state.errorPostLogin);

  const dispatch = useDispatch();
  
  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserData({
      ...userData,
      [name]: value
    });
    
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validation({ ...userData, [name]: value })[name]
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postLogin(userData));
  };
  
  const isFormValid = !userData.email.length || !userData.password.length;
  return (
    <div>
      { !loadingPostLogin &&
        <h1 className={h1_style}>Inicio de sesión</h1>
      }

      { !loadingPostLogin &&
        <form onSubmit={handleSubmit} >
        <div class="-mx-3 md:flex mb-3">
          <div class="md:w-full px-3">
            <input
              type="text"
              value={userData.email}
              name='email'
              onChange={handleChange} 
              placeholder=' Ingrese su email'
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-2 px-4 mb-2 placeholder-gray-900"
            />
            {errors.email && <p className="text-red-900 text-xs italic text-center">{errors.email}</p>}
          </div>
        </div>

        <div class="-mx-3 md:flex mb-3">
          <div class="md:w-full px-3">
            <input
              type='password'
              value={userData.password}
              name='password'
              onChange={handleChange}
              placeholder=' Ingrese su contraseña'
              class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-2 px-4 mb-2 placeholder-gray-900"
            />
            {errors.password && <p className="text-red-900 text-xs italic text-center">{errors.password}</p>}
          </div>
        </div>

        <div className={divButtons_style}>
          <button
            className={isFormValid ? button_disabledStyle : button_style}
            name='User'
            type="submit"
            disabled={isFormValid}
          >
            Iniciar Sesion
          </button>
        </div>

        {error && (
          <div className="flex items-center justify-center mt-3 text-lg text-red-600 italic"> 
            <p>{error}</p>
          </div>
        )}
        
      </form>
      }
    </div>
  );
};
export default Login;
