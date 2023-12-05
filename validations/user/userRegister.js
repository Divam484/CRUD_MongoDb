const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateRegisterInput(data, url = "") {
  let errors = {};

  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.mobile_number = !isEmpty(data.mobile_number) ? data.mobile_number : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirm_password = !isEmpty(data.confirm_password)? data.confirm_password: "";
  


  var alpha_name_pattern = /^[a-zA-Z"/" "\s]+$/;

  var strong_password = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

  if (!data.first_name.match(alpha_name_pattern)) {
    errors.first_name = "Enter First Name in Characters";
  }

  if (Validator.isEmpty(data.first_name)) {
    errors.first_name = "First Name is required";
  }

  if (!data.last_name.match(alpha_name_pattern)) {
    errors.last_name = "Enter Last Name in Characters";
  }

  if (Validator.isEmpty(data.last_name)) {
    errors.last_name = "Last Name is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  
  if (!Validator.isLength(data.mobile_number.toString(), { min: 10,max: 10,})) {
    errors.mobile_number = "Mobile Number must be 10 digits";
  }

  if (!Validator.isNumeric(data.mobile_number.toString())) {
    errors.mobile_number = "Mobile Number is Invalid";
  }

  if (Validator.isEmpty(data.mobile_number.toString())) {
    errors.mobile_number = "Mobile Number is required";
  }

 
  if (url != "edit") {
    if (!data.password.match(strong_password)) {
      // errors.password = "Ensure that password contains upper and lowercase letters.Include symbols like @,# and numbers";
      errors.password =
        "Password must be atleast 8 letters.Include with 1 uppercase character,1 special character,1 number.";
    }

    // if (!Validator.isLength(data.password, { min: 8 })) {
    //     errors.password = "Password must be at least 8 Characters";
    // }

    if (Validator.isEmpty(data.password)) {
      errors.password = "Password is required";
    }

    if (!Validator.equals(data.password, data.confirm_password)) {
      errors.confirm_password = "Password did not match";
    }

    if (Validator.isEmpty(data.confirm_password)) {
      errors.confirm_password = "Confirm Password is required";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

//The password must be at least 8 characters and contain one uppercase character and one special character
