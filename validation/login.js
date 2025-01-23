import validator from "validator";
import isEmptyLocal from "./isEmpty.js";

const validateLoginInput = (data) => {
  let errors = {};

  data.email = !isEmptyLocal(data.email) ? data.email : "";
  data.password = !isEmptyLocal(data.password) ? data.password : "";

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is not valid.";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password is required.";
  }

  return {
    errors,
    isValid: isEmptyLocal(errors),
  };
};

export default validateLoginInput;
