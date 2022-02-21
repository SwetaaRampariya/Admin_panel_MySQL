const Joi = require('joi');

function registrationValidate(rrr) {

    const schema = Joi.object({
        fname: Joi.string().required().empty().messages({
            "string.base": `first name should be a type of 'text'`,
            "string.empty": `first name cannot be an empty field`,
            "any.required": `first name is a required field`,
        }),
        mname: Joi.string().required().empty().messages({
            "string.base": `middle name should be a type of 'text'`,
            "string.empty": `middle name cannot be an empty field`,
            "any.required": `middle name is a required field`,
        }),
        lname: Joi.string().required().empty().messages({
            "string.base": `last name should be a type of 'text'`,
            "string.empty": `last name cannot be an empty field`,
            "any.required": `last name is a required field`,
        }),
        gender: Joi.string().required().empty().messages({
            "string.base": `gender name should be a type of string`,
            "string.empty": `gender name cannot be an empty field`,
            "any.required": `gender name is a required field`,
        }),
        hobby: Joi.required().empty().messages({
            "array.base": `hobby  should be a type of array`,
            "string.empty": `hobby  cannot be an empty field`,
            "any.required": `hobby  is a required field`,
        }),
        mobile: Joi.number().required().min(10).empty().messages({
            "number.base": `mobile name should be a type of 'number'`,
            "number.empty": `mobile name cannot be an empty field`,
            "number.min": `mobile number should be of minimum 10 digits`,
            "any.required": `mobile name is a required field`,
        }),
        city: Joi.string().required().empty().messages({
            "string.base": `city should be a type of string`,
            "string.empty": `city name cannot be an empty field`,
            "any.required": `city name is a required field`,
        }),
        Email: Joi.string().required().empty().email().messages({
            "string.base": `Email should be a type of string`,
            "string.empty": `Email cannot be an empty field`,
            "string.email": `Email format not valid`,
            "any.required": `Email is a required field`,
        }),

        Password: Joi.string().required().empty().min(6).max(16).messages({
            "string.base": `password should be a type of string`,
            "string.empty": `password cannot be an empty field`,
            "string.min": "password should be of minimum 6 characters",
            "string.max": "password should be of maximum 16 characters",
            "any.required": `password is a required field`,
        }),
        ConfirmPassword: Joi.string().required().empty().valid(Joi.ref('Password')).messages({
            "string.base": `password should be a type of string`,
            "string.empty": `password cannot be an empty field`,
            "string.min": "password should be of minimum 6 characters",
            "string.max": "password should be of maximum 16 characters",
            "any.required": `password is a required field`,
        })
    });
    return schema.validate(rrr);
}

function loginValidate(req) {
    const schema = Joi.object({
        Email: Joi.string().required().empty().email().messages({
            "string.base": `Email should be a type of 'text'`,
            "string.empty": `Email cannot be an empty field`,
            "string.email": `Email format not valid`,
            "any.required": `Email is a required field`,
        }),

        Password: Joi.string().required().empty().min(6).max(16).messages({
            "string.base": `Password should be a type of 'text'`,
            "string.empty": `Password cannot be an empty field`,
            "string.min": "Password should be of minimum 6 characters",
            "string.max": "Password should be of maximum 16 characters",
            "any.required": `Password is a required field`,
        }),

    })
    const options = {
        abortEarly: false,
    };
    return schema.validate(req, options);
}

function EmailValidate(req) {
    const schema = Joi.object({
        Email: Joi.string().required().empty().email().messages({
            "string.base": `Email should be a type of 'text'`,
            "string.empty": `Email cannot be an empty field`,
            "string.email": `Email format not valid`,
            "any.required": `Email is a required field`,
        })
    })
    const options = {
        abortEarly: false, 
    };
    return schema.validate(req, options);
}


function updatePasswordValidate(req) {
    const schema = Joi.object({
        Email: Joi.string().required().empty().email().messages({
             "string.base": `Email should be a type of 'text'`,
            "string.empty": `Email cannot be an empty field`,
             "string.email": `Email format not valid`,
             "any.required": `Email is a required field`,
         }),

        Password: Joi.string().required().empty().min(6).max(16).messages({
            "string.base": `Password should be a type of 'text'`,
            "string.empty": `Password cannot be an empty field`,
            "string.min": "Password should be of minimum 6 characters",
            "string.max": "Password should be of maximum 16 characters",
            "any.required": `Password is a required field`,
        }),
        ConfirmPassword: Joi.string().required().valid(Joi.ref('Password')).messages({
            "string.base": `Confirm Password should be a type of 'text'`,
            "any.only": "Confirm Password doesn't match password",
            "any.required": `Confirm Password is a required field`,
        })
    })
    const options = {
        abortEarly: false, // include all errors
    };
    return schema.validate(req, options);
}

function resetpasswordValidate(req) {
    const schema = Joi.object({
        Email: Joi.string().required().empty().email().messages({
            "string.base": `Email should be a type of 'text'`,
           "string.empty": `Email cannot be an empty field`,
            "string.email": `Email format not valid`,
            "any.required": `Email is a required field`,
        }),

        CurrentPassword: Joi.string().required().empty().min(6).max(16).messages({
            "string.base": `current password should be a type of 'text'`,
            "string.empty": `current password cannot be an empty field`,
            "string.min": "current password should be of minimum 6 characters",
            "string.max": "current password should be of maximum 16 characters",
            "any.required": `current password is a required field`,
        }),

        Password: Joi.string().required().empty().min(6).max(16).messages({
            "string.base": `password should be a type of 'text'`,
            "string.empty": `password cannot be an empty field`,
            "string.min": "password should be of minimum 6 characters",
            "string.max": "password should be of maximum 16 characters",
            "any.required": `password is a required field`,
        }),
        Pss: Joi.string().required().valid(Joi.ref('Password')).messages({
            "string.base": `confirm password should be a type of 'text'`,
            "any.only": "confirm password doesn't match password",
            "any.required": `confirm password is a required field`,
        })
    })
    const options = {
        abortEarly: false, // include all errors
    };
    return schema.validate(req, options);
}


function updateProfileValidate(req) {
    const schema = Joi.object({

        fname: Joi.string().required().empty().messages({
            "string.base": `first name should be a type of 'text'`,
            "string.empty": `first name cannot be an empty field`,
            "any.required": `first name is a required field`,
        }),
        mname: Joi.string().required().empty().messages({
            "string.base": `middle name should be a type of 'text'`,
            "string.empty": `middle name cannot be an empty field`,
            "any.required": `middle name is a required field`,
        }),
        lname: Joi.string().required().empty().messages({
            "string.base": `last name should be a type of 'text'`,
            "string.empty": `last name cannot be an empty field`,
            "any.required": `last name is a required field`,
        }),
        gender: Joi.string().required().empty().messages({
            "string.base": `gender name should be a type of string`,
            "string.empty": `gender name cannot be an empty field`,
            "any.required": `gender name is a required field`,
        }),
        hobby: Joi.required().empty().messages({
            "array.base": `hobby  should be a type of array`,
            "string.empty": `hobby  cannot be an empty field`,
            "any.required": `hobby  is a required field`,
        }),
        mobile: Joi.number().required().min(10).empty().messages({
            "number.base": `mobile name should be a type of 'number'`,
            "number.empty": `mobile name cannot be an empty field`,
            "number.min": `mobile number should be of minimum 10 digits`,
            "any.required": `mobile name is a required field`,
        }),
        city: Joi.string().required().empty().messages({
            "string.base": `city should be a type of string`,
            "string.empty": `city name cannot be an empty field`,
            "any.required": `city name is a required field`,
        }),
        Email: Joi.string().required().empty().email().messages({
            "string.base": `Email should be a type of string`,
            "string.empty": `Email cannot be an empty field`,
            "string.email": `Email format not valid`,
            "any.required": `Email is a required field`,
        })


    })
    const options = {
        abortEarly: false, 
    };
    return schema.validate(req, options);
}



module.exports = {
    registrationValidate,
    loginValidate,
    EmailValidate,
    updatePasswordValidate,
    resetpasswordValidate,
    updateProfileValidate

};