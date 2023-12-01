const validation = (userData) => {
    const errors = {};
    if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = "El email ingresado no es válido";
    }
    if (!userData.email) {
      errors.email = "Ingrese un email";
    }
    if (userData.email.length > 35) {
      errors.email = "El email debe tener menos de 35 carácteres";
    }
    if(!userData.password) {
      errors.password = 'Ingrese una contraseña.'
    }
    return errors;
  };
  export default validation;
  