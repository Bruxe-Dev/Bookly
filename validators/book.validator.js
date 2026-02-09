const Joi = require('joi')

const createBookSchema = Joi.object({
    title: Joi.string().trim().min(1).required,
    author: Joi.string().trim().required().min(1),
    price: Joi.number().required().min(0),
    category: Joi.string().valid(
        'literal-fiction',
        'science-fiction',
        'mystery',
        'science-tech',
        'business',
        'classics',
        'History'
    ).required(),
    publisher: Joi.string().trim().required(),
    year: Joi.number().min(1000).required(),
    rating: Joi.number().min(0).max(5).required(),
    stock: Joi.number().min(0).required(),
    coverImage: Joi.string().trim().optional
})

const updateBookSchema = Joi.object({
    title: Joi.string().trim(),
    author: Joi.string().trim(),
    price: Joi.number().min(0),
    category: Joi.string().valid(
        'literal-fiction',
        'science-fiction',
        'mystery',
        'science-tech',
        'business',
        'classics',
        'History'
    ),
    publisher: Joi.string().trim(),
    year: Joi.number().min(1000),
    rating: Joi.number().min(1).max(5),
    stock: Joi.number().min(0),
    coverImage: Joi.string().trim()
}).min(1);

const idSchema = Joi.object({
    id: Joi.string().hex().length(24).required()
})

module.exports = { createBookSchema, updateBookSchema, idSchema }