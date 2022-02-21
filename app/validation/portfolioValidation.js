const JoiBase = require("@hapi/joi");
const JoiDate = require("@hapi/joi-date");

const Joi = JoiBase.extend(JoiDate);

function portfolioValidation(req) {
    const schema = Joi.object({
        // categoryName: Joi.string().empty().required().messages({
        //     "string.base": `CategoryName should be a type of 'string'`,
        //     "string.empty": `CategoryName can not an empty field`,
        //     "any.required": `CategoryName is a required field`,
        // }),
        projectName: Joi.string().empty().required().messages({
            "string.base": `projectName should be a type of 'string'`,
            "string.empty": `projectName can not an empty field`,
            "any.required": `projectName is a required field`,
        }),
        projectTitle: Joi.string().empty().required().messages({
            "string.base": `projectTitle should be a type of 'string'`,
            "string.empty": `projectTitle can not an empty field`,
            "any.required": `projectTitle is a required field`,
        }),
        projectDate: Joi.date().required().messages({
            "any.required": ` projectDate is a required field`,
        }),
        projectDescription: Joi.string().empty().required().messages({
            "string.base": ` projectDescription should be choose`,
            "string.empty": ` projectDescription can not an empty field`,
            "any.required": `projectDescription is a required field`,
        }),
    })
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };
    return schema.validate(req, options);
}


module.exports = { portfolioValidation }


