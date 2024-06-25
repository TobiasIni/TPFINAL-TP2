import Joi from 'joi';

export const newUserSchema = Joi.object({
    nombre: Joi.string().max(20).required().messages({
        'string.base': `"nombre" debe ser un texto`,
        'string.max': `"nombre" no puede tener más de 20 caracteres`,
        'any.required': `"nombre" es requerido`
    }),
    email: Joi.string().max(20).required().messages({
        'string.base': `"email" debe ser un texto`,
        'string.max': `"email" no puede tener más de 20 caracteres`,
        'any.required': `"email" es requerido`
    }),
    rol: Joi.string().max(10).required().messages({
        'string.base': `"rol" debe ser un texto`,
        'string.max': `"rol" no puede tener más de 10 caracteres`,
        'any.required': `"rol" es requerido`
    }),
    localidad: Joi.string().max(20).required().messages({
        'string.base': `"localidad" debe ser un texto`,
        'string.max': `"localidad" no puede tener más de 20 caracteres`,
        'any.required': `"localidad" es requerido`
    }),
    id: Joi.number().integer().greater(0).messages({
        'number.base': `"id" debe ser un número entero`,
        'number.integer': `"id" debe ser un número entero`,
        'number.greater': `"id" debe ser mayor a 0`,
    })
});

export const editUserSchema = Joi.object({
    nombre: Joi.string().max(20).required().messages({
        'string.base': `"nombre" debe ser un texto`,
        'string.max': `"nombre" no puede tener más de 20 caracteres`,
        'any.required': `"nombre" es requerido`
    }),
    email: Joi.string().max(20).required().messages({
        'string.base': `"email" debe ser un texto`,
        'string.max': `"email" no puede tener más de 20 caracteres`,
        'any.required': `"email" es requerido`
    }),
    rol: Joi.string().max(10).required().messages({
        'string.base': `"rol" debe ser un texto`,
        'string.max': `"rol" no puede tener más de 10 caracteres`,
        'any.required': `"rol" es requerido`
    }),
    localidad: Joi.string().max(20).required().messages({
        'string.base': `"localidad" debe ser un texto`,
        'string.max': `"localidad" no puede tener más de 20 caracteres`,
        'any.required': `"localidad" es requerido`
    }),
    id: Joi.number().integer().greater(0).required().messages({
        'number.base': `"id" debe ser un número entero`,
        'number.integer': `"id" debe ser un número entero`,
        'number.greater': `"id" debe ser mayor a 0`,
        'any.required': `"id" es requerido`
    })
});
