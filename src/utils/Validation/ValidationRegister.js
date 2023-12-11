const validation = (userData) => {
  const errors = {};
  const regexEmail = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
  if (!regexEmail.test(userData.email)) {
    errors.email = "El email ingresado no es válido";
  }
  if (!userData.email) {
    errors.email = "Debe ingresar un email";
  }
  if (userData.email.length > 50) {
    errors.email = "El email debe tener menos de 50 caracteres";
  }
  if (userData.password.length === 0) {
    errors.password = 'Debe ingresar una contraseña.'
  }
  if (userData.password.length <= 8 && userData.password.length > 0) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres.';
  }
  if(!userData.number) {
    errors.number = "Debe ingresar un número de celular."
  }
  if(!userData.name) {
    errors.name = 'Debe haber un nombre.'
  }
  if(!userData.address) {
    errors.address = 'Debe haber una dirección.'
  }

  return errors;
};

export default validation;