import  { useState } from "react";
import { h1_style, input_style, label_style, div_style, button_style, button_disabledStyle } from "./tailwindStylesRegister";
import { postUser } from "../../../redux/actions";
import { useDispatch, useSelector } from 'react-redux';
import validation from "../../../utils/Validation/ValidationRegister";

const Register = () => {
  const access = useSelector(state => state.access);
  const success = useSelector(state => state.successPostUser);
  const error = useSelector(state => state.errorPostUser);
  const messageRegister = useSelector(state => state.messageRegister);

  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState({
    name: '',
    phoneNumber: '',
    img: '',
    email: '',
    password: '',
    address: ''
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
    dispatch(postUser(userData));
  };

  const isFormValid =
  !userData.name ||
  !userData.phoneNumber ||
  !userData.email ||
  !userData.password ||
  !userData.address;
  
  console.log(messageRegister);
  console.log(error);

  return (
    <div>
      <h1 className={h1_style}>Registro de Usuario</h1>
      <form id="registroForm" onSubmit={handleSubmit}>
        <label className={label_style}>Nombre:</label>
        <input 
          type="text"
          value={userData.name} 
          name="name" 
          onChange={handleChange} 
          className={input_style} 
        />
        {errors.name && <p>{errors.name}</p>}
        <br />
        <br />

        <label className={label_style}>Correo Electrónico: </label>
        <input 
          type="text"
          value={userData.email} 
          name="email" 
          onChange={handleChange} 
          className={input_style} 
        />
        {errors.email && <p>{errors.email}</p>}
        <br />
        <br />

        <label className={label_style}>Celular:</label>
        <br />
        <input 
          value={userData.phoneNumber} 
          name="phoneNumber" 
          onChange={handleChange} 
          className={input_style} 
        />
        {errors.phoneNumber && <p>{errors.phoneNumber}</p>}
        <br />
        <br />

        <label className={label_style}>Direccion:</label>
        <br />
        <input 
          value={userData.address} 
          name="address" 
          onChange={handleChange} 
          className={input_style} 
        />
        {errors.address && <p>{errors.address}</p>}
        <br />
        <br />

        <label className={label_style}>Contraseña: </label>
          <input
            type='password'
            value={userData.password}
            name='password'
            onChange={handleChange}
            placeholder=' Ingrese su contraseña'
            className={input_style}
          />
          {errors.password && <p>{errors.password}</p>}
          <br />
          <br />

        <div className={div_style}>
          <button className={!isFormValid ? button_disabledStyle : button_style} type="submit" disabled={isFormValid}>Registrarse</button>
        </div>
        
        {success && access && (
          <p>{messageRegister}</p>
        )}

        { error && (
          <p>{error}</p>
        )}
      </form>
    </div>
  );
};

export default Register;