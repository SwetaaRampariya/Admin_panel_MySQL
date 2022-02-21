const Joi = require("@hapi/joi");

function categoryValidation(req) {
    const schema = Joi.object({
        categoryName: Joi.string().empty().required().messages({
            "string.base": `contactName should be a type of 'string'`,
            "string.empty": `contact can not an empty field`,
            "any.required": `contact name is a required field`,
        })
    })
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };
    return schema.validate(req, options);
}


module.exports = { categoryValidation }


