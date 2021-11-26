const Joi = require('joi');

const todoInsertSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required()
});


module.exports = todoInsertSchema;