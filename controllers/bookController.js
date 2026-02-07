const Book = require('../models/Book')

exports.getBooks = async (req, res) => {
    try {
        const {
            // Filtering parameters
            category,
            author,
            minPrice,
            maxPrice,
            minRating,
            maxRating,
            year,
            minYear,
            maxYear,
            inStock,
            search, // Search in title and author

            // Sorting parameters
            sort = 'createdAt',
            order = 'desc',

            // Pagination parameters
            page = 1,
            limit = 10
        } = req.query;
    } catch (error) {

    }
}

