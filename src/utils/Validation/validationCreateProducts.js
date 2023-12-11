const validation = (product) => {
  const errors = {};
 
    if (!product.name) {
    errors.name = "Name is required";
    } else if (product.name.length < 3) {
      errors.name = "Must be at least 3 characters";
    } else if (product.name.length > 20) {
      errors.name = "Must be less than 20 characters";
    };
  
  
    if (!product.brand) {
      errors.brand = "Brand is required";
    } else if (product.brand.length < 3) {
      errors.brand = "Must be at least 3 characters";
    } else if (product.brand.length > 20) {
      errors.brand = "Must be less than 20 characters";
    };
  
  
    if (!product.category) {
    errors.category = "Category is required";
    };
  
  
    if (!product.description) {
      errors.description = "Description is required";
    } else if (product.description.length < 15) {
      errors.description = "Must be at least 15 characters";
    } else if (product.description.length > 250) {
      errors.description = "Must be less than 250 characters";
    };
  
    if (!product.price) {
      errors.price = "Price is required.";
    } else if (product.price < 1) {
      errors.price = "Minimum 1";
    };
  
  
    if (!product.quantity) {
      errors.quantity = "Quantity is required.";
    } else if (product.quantity < 1) {
      errors.quantity = "Minimum 1";
    };
  
  
    return errors;
};
 
export default validation;