import validator from "validator";
import isEmptyLocal from "./isEmpty.js";

const validateRegisterInput = async (data) => {
  let errors = {};

  // data.name = !isEmptyLocal(data.name) ? data.name : "";
  // data.email = !isEmptyLocal(data.email) ? data.email : "";
  // data.password = !isEmptyLocal(data.password) ? data.password : "";
  // data.password2 = !isEmptyLocal(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 to 30 characters.";
  }
  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required.";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is not valid.";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  }
  if (validator.isEmpty(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be atleast 6 character.";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required.";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confrim Password is required.";
  }
  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Password must matched.";
  }

  return {
    errors,
    isValid: isEmptyLocal(error),
  };
};

export default validateRegisterInput;
