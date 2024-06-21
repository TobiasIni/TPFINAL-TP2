import Joi from 'joi';

export const newProductSchema = Joi.object({
    id: Joi.number().integer().greater(0).required().messages({
        'number.base': `"id" debe ser un número`,
        'number.integer': `"id" debe ser un número entero`,
        'number.greater': `"id" debe ser mayor a 0`,
        'any.required': `"id" es requerido`
    }),
    name: Joi.string().max(20).required().messages({
        'string.base': `"name" debe ser un texto`,
        'string.max': `"name" no puede tener más de 20 caracteres`,
        'any.required': `"name" es requerido`
    }),
    description: Joi.string().max(50).required().messages({
        'string.base': `"description" debe ser un texto`,
        'string.max': `"description" no puede tener más de 50 caracteres`,
        'any.required': `"description" es requerido`
    }),
    currency: Joi.string().max(3).required().messages({
        'string.base': `"currency" debe ser un texto`,
        'string.max': `"currency" no puede tener más de 3 caracteres`,
        'any.required': `"currency" es requerido`
    }),
    price: Joi.number().precision(2).greater(0).required().messages({
        'number.base': `"price" debe ser un número`,
        'number.precision': `"price" debe tener un máximo de 2 decimales`,
        'number.greater': `"price" debe ser mayor a 0`,
        'any.required': `"price" es requerido`
    }),
    stock: Joi.number().integer().greater(0).required().messages({
        'number.base': `"stock" debe ser un número entero`,
        'number.integer': `"stock" debe ser un número entero`,
        'number.greater': `"stock" debe ser mayor a 0`,
        'any.required': `"stock" es requerido`
    })
});

export const editProductSchema = Joi.object({
    id: Joi.number().integer().greater(0).required().messages({
        'number.base': `"id" debe ser un número`,
        'number.integer': `"id" debe ser un número entero`,
        'number.greater': `"id" debe ser mayor a 0`,
        'any.required': `"id" es requerido`
    }),
    name: Joi.string().max(20).required().messages({
        'string.base': `"name" debe ser un texto`,
        'string.max': `"name" no puede tener más de 20 caracteres`,
        'any.required': `"name" es requerido`
    }),
    description: Joi.string().max(50).required().messages({
        'string.base': `"description" debe ser un texto`,
        'string.max': `"description" no puede tener más de 50 caracteres`,
        'any.required': `"description" es requerido`
    }),
    currency: Joi.string().max(3).required().messages({
        'string.base': `"currency" debe ser un texto`,
        'string.max': `"currency" no puede tener más de 3 caracteres`,
        'any.required': `"currency" es requerido`
    }),
    price: Joi.number().precision(2).greater(0).required().messages({
        'number.base': `"price" debe ser un número`,
        'number.precision': `"price" debe tener un máximo de 2 decimales`,
        'number.greater': `"price" debe ser mayor a 0`,
        'any.required': `"price" es requerido`
    }),
    stock: Joi.number().integer().greater(0).required().messages({
        'number.base': `"stock" debe ser un número entero`,
        'number.integer': `"stock" debe ser un número entero`,
        'number.greater': `"stock" debe ser mayor a 0`,
        'any.required': `"stock" es requerido`
    })
});
