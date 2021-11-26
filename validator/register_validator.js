const Joi = require('joi');

const registrationSchema = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(4).max(20).required()
});


module.exports = registrationSchema;