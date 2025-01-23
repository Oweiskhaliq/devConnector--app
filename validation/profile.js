import validator from "validator";
import isEmptyLocal from "./isEmpty.js";

const validateProfileInput = (data) => {
  let errors = {};

  data.handle = !isEmptyLocal(data.handle) ? data.handle : "";
  data.status = !isEmptyLocal(data.status) ? data.status : "";
  data.skills = !isEmptyLocal(data.skills) ? data.skills : "";

  if (validator.isEmpty(data.handle)) {
    errors.handle = "handle field is required.";
  }

  if (!validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "hanlde will be between 2 to 40 characters";
  }

  if (validator.isEmpty(data.status)) {
    errors.status = "status filed is required";
  }
  if (validator.isEmpty(data.skills)) {
    errors.skills = "skills filed is required";
  }
  if (!isEmptyLocal(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "Not a valid URl";
    }
  }
  if (!isEmptyLocal(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URl";
    }
  }
  if (!isEmptyLocal(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URl";
    }
  }
  if (!isEmptyLocal(data.linkedin)) {
    if (!validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid URl";
    }
  }
  if (!isEmptyLocal(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URl";
    }
  }

  return {
    errors,
    isValid: isEmptyLocal(errors),
  };
};

export default validateProfileInput;
