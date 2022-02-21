const Joi = require('@hapi/joi');

function testimonialValidation(req) {
    const schema = Joi.object({
        T_Name: Joi.string().empty().required().messages({
            "string.base": `TestimonialName should be a type of 'string'`,
            "string.empty": `TestimonialName can not an empty field`,
            "any.required": `TestimonialName  is a required field`,
        }),
        designation: Joi.string().empty().required().messages({
            "string.base": `Designation should be a type of 'string'`,
            "string.empty": `Designation can not an empty field`,
            "any.required": `Designation is a required field`,
        }),
        T_Desc: Joi.string().empty().required().messages({
            "string.base": `testimonialDescription should be a type of 'string'`,
            "string.empty": `testimonialDescription can not an empty field`,
            "any.required": `testimonialDescription is a required field`,
        }),
    })
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };
    return schema.validate(req, options);
}


module.exports = { testimonialValidation }


