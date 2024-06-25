import Joi from 'joi';

export const newBuySchema = Joi.object({
    compra: Joi.array().items(Joi.object({
        productId: Joi.number().required().messages({
            'number.base': `"productId" debe ser un número`,
            'any.required': `"productId" es requerido`
        }),
        cant: Joi.number().required().messages({
            'number.base': `"cant" debe ser un número`,
            'any.required': `"cant" es requerido`
        })
    })).min(1).required().messages({
        'array.base': `"compra" debe ser un arreglo`,
        'array.min': `"compra" debe contener al menos un elemento`,
        'any.required': `"compra" es requerido`
    })
}).messages({
    'object.base': `El contenido debe ser un objeto`,
    'any.required': `El campo es requerido`
});

export const editBuySchema = Joi.object({
    _id: Joi.any(),
    id: Joi.number().required().messages({
        'number.base': `"id" debe ser un número`,
        'any.required': `"id" es requerido`
    }),
    userId: Joi.number().required().messages({
        'number.base': `"userId" debe ser un número`,
        'any.required': `"userId" es requerido`
    }),
    products: Joi.array().items(Joi.object({
        productId: Joi.number().required().messages({
            'number.base': `"productId" debe ser un número`,
            'any.required': `"productId" es requerido`
        }),
        cant: Joi.number().required().messages({
            'number.base': `"cant" debe ser un número`,
            'any.required': `"cant" es requerido`
        }),
        subTotal: Joi.number().required().messages({
            'number.base': `"subTotal" debe ser un número`,
            'any.required': `"subTotal" es requerido`
        })
    })).min(1).required().messages({
        'array.base': `"products" debe ser un arreglo`,
        'array.min': `"products" debe contener al menos un elemento`,
        'any.required': `"products" es requerido`
    }),
    envio: Joi.bool().required().messages({
        'number.base': `"envio" debe ser un booleano`,
        'any.required': `"envio" es requerido`
    }),
    currency: Joi.string().max(5).required().messages({
        'string.base': `"currency" debe ser un texto`,
        'string.max': `"currency" no puede tener más de 5 caracteres`,
        'any.required': `"currency" es requerido`
    }),
    total: Joi.number().required().messages({
        'number.base': `"total" debe ser un número`,
        'any.required': `"total" es requerido`
    })
}).messages({
    'object.base': `El contenido debe ser un objeto`,
    'any.required': `El campo es requerido`
});
