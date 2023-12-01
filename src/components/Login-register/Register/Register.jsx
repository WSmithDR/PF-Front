import React, { useState, useEffect } from "react";
import { h1_style, input_style, label_style, select_style, div_style, button_style, button_disabledStyle } from "./tailwindStylesRegister";
import closureHandleChange from "./Handles/closureHandleChange"
import closureHandleSubmit from "./Handles/closureHandleSubmit";

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    lastname: '',
    nationality: '',
    cellphone: '',
    photo: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [messageRegister, setMessage] = useState('');

  const [errors, setErrors] = useState({});
  const handleChange = closureHandleChange(userData, setUserData, setIsButtonDisabled, setErrors)
  const handleSubmit = closureHandleSubmit(userData, setMessage)
  return (
    <div>
      <h1 className={h1_style}>Registro de Usuario</h1>
      <form id="registroForm" onSubmit={handleSubmit} method="post">
        <label className={label_style}>Nombre:</label>
        <input className={input_style} name="name" value={userData.name} onChange={handleChange} />
        {errors.name && <p>{errors.name}</p>}
        <br />
        <br />

        <label className={label_style}>Apellido:</label>
        <input className={input_style} name="lastname" value={userData.lastname} onChange={handleChange} />
        {errors.lastname && <p>{errors.lastname}</p>}
        <br />
        <br />

        <label className={label_style}>Celular:</label>
        <br />
        <input className={input_style} name="cellphone" value={userData.cellphone} onChange={handleChange} />
        {errors.cellphone && <p>{errors.cellphone}</p>}
        <br />
        <br />

        <label className={label_style}>Correo Electrónico: </label>
        <input className={input_style} name="email" value={userData.email} onChange={handleChange} />
        {errors.email && <p>{errors.email}</p>}
        <br />
        <br />

        <label className={label_style}>Contraseña: </label>
        <input className={input_style} type="password" name="password" value={userData.password} onChange={handleChange} />
        {errors.password && <p>{errors.password}</p>}
        <br />
        <br />

        <label className={label_style}>Confirmar Contraseña: </label>
        <input className={input_style} type="password" name="confirmPassword" value={userData.confirmPassword} onChange={handleChange} />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <br />
        <br />

        <div className={div_style}>
          <button className={isButtonDisabled ? button_disabledStyle : button_style} type="submit" disabled={isButtonDisabled}>Registrar</button>
        </div>
        {messageRegister && <p className={h1_style}>{messageRegister}</p>}
      </form>
    </div>
  );
};

export default Register;