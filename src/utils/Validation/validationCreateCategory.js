const validation = (category) => {
  const errors = {};
  if (!category.name) {
      errors.name = "El nombre es necesario.";
    } else if (category.name.length < 3) {
      errors.name = "Debe tener mas de 3 caracteres.";
    } else if (category.name.length > 20) {
      errors.name = "Debe tener menos de 20 caracteres.";
    };

    if (!category.description) {
      errors.description = "La descripcion es necesaria.";
    } else if (category.description.length < 15) {
      errors.description = "Debe tener mas de 15 caracteres.";
    } else if (category.description.length > 250) {
      errors.description = "Debe tener menos de 250 caracteres.";
    };

  return errors;
};

export default validation;