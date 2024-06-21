import Joi from 'joi';

export const newProductSchema = Joi.object({
    name: Joi.string().max(20).required(),
    description: Joi.string().max(50).required(),
    currency: Joi.string().max(3).required(),
    price: Joi.number().precision(2).greater(0).required(),
    stock: Joi.number().integer().greater(0).required()
});

export const editProductSchema = Joi.object({
    name: Joi.string().max(20).required(),
    description: Joi.string().max(50).required(),
    currency: Joi.string().max(3).required(),
    price: Joi.number().precision(2).greater(0).required(),
    stock: Joi.number().integer().greater(0).required()
});
