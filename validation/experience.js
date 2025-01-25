import validator from "validator";
import isEmptyLocal from "./isEmpty.js";

const validateExperienceInput = (data) => {
  let errors = {};

  data.title = !isEmptyLocal(data.title) ? data.title : "";
  data.company = !isEmptyLocal(data.company) ? data.company : "";
  data.from = !isEmptyLocal(data.from) ? data.from : "";

  if (!validator.isLength(data.title, { min: 2, max: 40 })) {
    errors.title = "title will be between 2 to 40 characters";
  }
  if (validator.isEmpty(data.title)) {
    errors.title = "title field is required.";
  }

  if (validator.isEmpty(data.company)) {
    errors.company = "company filed is required";
  }
  if (validator.isEmpty(data.from)) {
    errors.from = "from filed is required";
  }

  return {
    errors,
    isValid: isEmptyLocal(errors),
  };
};

export default validateExperienceInput;
