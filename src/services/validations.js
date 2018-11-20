const validator = require("validator");

const validations = {
  validateInput: req => {
    const errors = {};
    if (!validator.isEmail(req.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (validator.isEmpty(req.password)) {
      errors.password = "Please enter your password";
    }
    const isValid = Object.keys(errors).length === 0 ? true : false;;
    return {
      errors,
      isValid
    };
  },
  validateNewProduct: req => {
    const errors = {};
    const { name, category, description } = req;
    if (validator.isEmpty(name)) {
      errors.name = "Please enter the name of the product";
    }
    if (validator.isEmpty(category)) {
      errors.category = "Select the product category";
    }
    if (validator.isEmpty(description)) {
      errors.description = "Please type in the product description";
    }
    return { errors };
  },
  validateNewUser: req => {
    const errors = {};
    if (validator.isEmpty(req.firstName)) {
      errors.firstName = "Please enter the user's first name";
    }
    if (validator.isEmpty(req.lastName)) {
      errors.lastName = "Please enter the user's last name";
    }
    if (validator.isEmpty(req.email)) {
      errors.email = "Please enter the user's email address";
    }
    if (!validator.isEmail(req.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (validator.isEmpty(req.phoneNumber)) {
      errors.phoneNumber = "Please enter the user's phone number";
    }
    const isValid = Object.keys(errors).length === 0 ? true : false;;
    return { errors, isValid };
  }
};

export default validations;
