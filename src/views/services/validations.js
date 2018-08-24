const validator = require("validator");
const isNothing = require("lodash/isEmpty");

let validations = {
  validateInput: req => {
    let errors = {};
    if (!validator.isEmail(req.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (validator.isEmpty(req.password)) {
      errors.password = "Please enter your password";
    }
    let isValid = isNothing(errors);
    return {
      errors,
      isValid
    };
  },
  validateNewProduct: req => {
    let errors = {};
    if (validator.isEmpty(req.name)) {
      errors.name = "Please enter the name of the product";
    }
    if (validator.isEmpty(req.price)) {
      errors.price = "Please enter the price of the product";
    }
    if (validator.isEmpty(req.category)) {
      errors.category = "Select the product category";
    }
    if (validator.isEmpty(req.description)) {
      errors.description = "Please type in the product description";
    }
    return { errors };
  },
  validateNewUser: req => {
    let errors = {};
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
    let isValid = isNothing(errors);
    return { errors, isValid };
  }
};

export default validations;
