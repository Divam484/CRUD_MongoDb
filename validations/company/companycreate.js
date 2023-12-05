const Validator = require("validator");
const isEmpty = require('../is-empty');

module.exports = function validatecompanyCreateInput(data) {
    let errors = {};

    data.company_name     = !isEmpty(data.company_name) ? data.company_name : "";
    data.contact_number    = !isEmpty(data.contact_number) ? data.contact_number : "";
    data.address           = !isEmpty(data.address) ? data.address: "";
    data.email            = !isEmpty(data.email) ? data.email : "";
    data.contact_person         = !isEmpty(data.contact_person) ? data.contact_person : "";
    data.pincode          = !isEmpty(data.pincode) ? data.pincode: "";
    data.landmark          = !isEmpty(data.landmark) ? data.landmark: "";
    data.city          = !isEmpty(data.city) ? data.city: "";
    data.state          = !isEmpty(data.state) ? data.state: "";
    data.country          = !isEmpty(data.country) ? data.country: "";
    data.gstIn          = !isEmpty(data.gstIn) ? data.gstIn: "";
    data.status           = !isEmpty(data.status) ? data.status: "";
    
    var alpha_name_pattern = /^[a-zA-Z"/" "\s]+$/;

    


    if (!data.company_name.match(alpha_name_pattern)) {
        errors.company_name = "Enter Company Name in Characters";
    }

    if (Validator.isEmpty(data.company_name)) {
        errors.company_name = "Company Name is required";
    }


    if (!Validator.isLength(data.contact_number.toString(), { min: 10,max: 10 })) {
        errors.contact_number = "contact Number must be 10 digits";
    }
    
    if (!Validator.isNumeric(data.contact_number.toString())) {
        errors.contact_number = "contact Number is Invalid";
    }
    
    if (Validator.isEmpty(data.contact_number.toString())) {
        errors.contact_number = "contact Number is required";
    }

    if (Validator.isEmpty(data.address)) {
        errors.address = "Address is required";
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }

    if (Validator.isEmpty(data.contact_person)) {
        errors.contact_person = "contact person is required";
    }

    if (!data.contact_person.match(alpha_name_pattern)){
        errors.contact_person = "Enter contact person In Characters";
    }

    if (!Validator.isLength(data.pincode.toString(), { min: 6,max: 6 })) {
        errors.pincode = "pincode must be 6 digits";
    }
    
    if (!Validator.isNumeric(data.pincode.toString())) {
        errors.pincode = "pincode is Invalid";
    }
    
    if (Validator.isEmpty(data.pincode.toString())) {
        errors.pincode = "pincode is required";
    }

    if (Validator.isEmpty(data.landmark)) {
        errors.landmark = "landmark is required";
    }

    if (!data.city.match(alpha_name_pattern)) {
        errors.city = "Enter city Name in Characters";
    }

    if (Validator.isEmpty(data.city)) {
        errors.city = "city is required";
    }

    if (!data.state.match(alpha_name_pattern)) {
        errors.state = "Enter state Name in Characters";
    }

    if (Validator.isEmpty(data.state)) {
        errors.state = "state is required";
    }

    if (!data.country.match(alpha_name_pattern)) {
        errors.country = "Enter country Name in Characters";
    }

    if (Validator.isEmpty(data.country)) {
        errors.country = "country is required";
    }

    if (Validator.isEmpty(data.gstIn)) {
        errors.gstIn = "Gst No is required";
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = "status is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};


