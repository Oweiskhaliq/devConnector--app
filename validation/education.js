import validator from "validator";
import isEmptyLocal from "./isEmpty.js";

const validateEducationInput = (data) => {
  let errors = {};

  data.school = !isEmptyLocal(data.school) ? data.school : "";
  data.degree = !isEmptyLocal(data.degree) ? data.degree : "";
  data.fieldofstudy = !isEmptyLocal(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = !isEmptyLocal(data.from) ? data.from : "";

  if (!validator.isLength(data.school, { min: 2, max: 40 })) {
    errors.school = "school name will be between 2 to 40 characters";
  }
  if (validator.isEmpty(data.school)) {
    errors.school = "school field is required.";
  }

  if (validator.isEmpty(data.degree)) {
    errors.degree = "degree filed is required";
  }
  if (validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "fieldofstudy filed is required";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "from Date  is required";
  }

  return {
    errors,
    isValid: isEmptyLocal(errors),
  };
};

export default validateEducationInput;
