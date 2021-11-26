const Joi = require('joi');

const todoDeleteSchema = Joi.object({
    id: Joi.number().integer().required()
});


module.exports = todoDeleteSchema;