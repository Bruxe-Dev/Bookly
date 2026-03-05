const Joi = require('joi');

const bookQuerySchema = Joi.object({
    category: Joi.string(),
    author: Joi.string(),
    minPrice: Joi.number().min(0),
    maxPrice: Joi.number().min(0),
    minRating: Joi.number().min(1).max(5),
    maxRating: Joi.number().min(1).max(5),
    year: Joi.number(),
    minYear: Joi.number(),
    maxYear: Joi.number(),
    inStock: Joi.boolean(),
    search: Joi.string(),
    sort: Joi.string().valid(
        'title', 'author', 'price', 'rating',
        'year', 'stock', 'createdAt', 'updatedAt'
    ),
    order: Joi.string().valid('asc', 'desc'),
    page: Joi.number().min(1),
    limit: Joi.number().min(1).max(100)
});


module.exports = { bookQuerySchema }