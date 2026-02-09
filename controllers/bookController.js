const Book = require('../models/Book')
const { createBookSchema, updateBookSchema, idSchema } = require('../validators/book.validator')

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
            search,
            sort = 'createdAt',
            order = 'desc',

            // Pagination parameters
            page = 1,
            limit = 10
        } = req.query;

        const filter = {};

        if (category) {
            filter.category = category;
        }

        if (author) {
            filter.author = {
                $regex: author, $options: 'i'
            }
        }

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice)
            if (maxPrice) filter.price.$lte = Number(maxPrice)
        }

        // Rating range filter
        if (minRating || maxRating) {
            filter.rating = {};
            if (minRating) filter.rating.$gte = Number(minRating);
            if (maxRating) filter.rating.$lte = Number(maxRating);
        }

        // Year filter
        if (year) {
            filter.year = Number(year);
        } else if (minYear || maxYear) {
            filter.year = {};
            if (minYear) filter.year.$gte = Number(minYear);
            if (maxYear) filter.year.$lte = Number(maxYear);
        }

        // Stock availability filter
        if (inStock === 'true') {
            filter.stock = { $gt: 0 };
        } else if (inStock === 'false') {
            filter.stock = 0;
        }

        // Search in title and author (case-insensitive)
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { author: { $regex: search, $options: 'i' } }
            ];
        }


        const allowedSortFields = ['title', 'author', 'price', 'rating', 'year', 'stock', 'createdAt', 'updatedAt'];
        const sortField = allowedSortFields.includes(sort) ? sort : 'createdAt';
        const sortOrder = order === 'asc' ? 1 : -1;
        const sortOptions = { [sortField]: sortOrder };

        const pageNumber = Math.max(1, parseInt(page));
        const limitNumber = Math.min(100, Math.max(1, parseInt(limit)));
        const skip = (pageNumber - 1) * limitNumber;

        // Get total count (for pagination metadata)
        const totalBooks = await Book.countDocuments(filter);

        // Get books with filters, sorting, and pagination
        const books = await Book.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNumber)
            .select('-__v'); // Exclude version key from results


        const totalPages = Math.ceil(totalBooks / limitNumber);


        res.status(200).json({
            success: true,
            count: books.length,
            data: books,
            pagination: {
                totalBooks,
                totalPages,
                currentPage: pageNumber,
                limit: limitNumber,
                hasNextPage: pageNumber < totalPages,
                hasPreviousPage: pageNumber > 1
            },
            filters: {
                category: category || null,
                author: author || null,
                priceRange: {
                    min: minPrice ? Number(minPrice) : null,
                    max: maxPrice ? Number(maxPrice) : null
                },
                ratingRange: {
                    min: minRating ? Number(minRating) : null,
                    max: maxRating ? Number(maxRating) : null
                },
                yearRange: {
                    min: minYear ? Number(minYear) : null,
                    max: maxYear ? Number(maxYear) : null,
                    exact: year ? Number(year) : null
                },
                inStock: inStock === 'true' ? true : inStock === 'false' ? false : null,
                search: search || null
            },
            sorting: {
                field: sortField,
                order: order === 'asc' ? 'ascending' : 'descending'
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching books',
            error: error.message
        });
    }
};


exports.getBookById = async (req, res) => {
    try {
        const { error } = idSchema.validate(req.params);

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Book Id'
            });
        }

        const book = await Book.findById(req.params.id).select('-__v');

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        res.status(200).json({
            success: true,
            data: book
        });

    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: 'Invalid book ID format'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error fetching book',
            error: error.message
        });
    }
};


exports.createBook = async (req, res) => {
    try {
        const { error, value } = createBookSchema.validate(req.body, {
            abortEarly: false
        });

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                Errors: error.details.map(err => err.message)
            })
        }

        const book = await Book.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: book
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'A book with this ISBN already exists'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error creating book',
            error: error.message
        });
    }
};


exports.updateBook = async (req, res) => {
    try {
        const { error, value } = updateBookSchema.validate(req.body, {
            abortEarly: false
        })

        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Validation Error',
                errors: error.details.map(err => err.message)
            })
        }

        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,              // Return updated document
                runValidators: true     // Run schema validators
            }
        ).select('-__v');

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: book
        });

    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: 'Invalid book ID format'
            });
        }

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: messages
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error updating book',
            error: error.message
        });
    }
};


exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: 'Book not found'
            });
        }

        res.status(200).json({
            success: true,
            message: `"${book.title}" has been deleted successfully`
        });

    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: 'Invalid book ID format'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error deleting book',
            error: error.message
        });
    }
};

exports.getStatistics = async (req, res) => {
    try {
        const stats = await Book.aggregate([
            {
                $group: {
                    _id: null,
                    totalBooks: { $sum: 1 },
                    averagePrice: { $avg: '$price' },
                    averageRating: { $avg: '$rating' },
                    totalStock: { $sum: '$stock' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' }
                }
            }
        ]);

        const categoryStats = await Book.aggregate([
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 },
                    averagePrice: { $avg: '$price' },
                    averageRating: { $avg: '$rating' }
                }
            },
            { $sort: { count: -1 } }
        ]);

        res.status(200).json({
            success: true,
            data: {
                overall: stats[0] || {},
                byCategory: categoryStats
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics',
            error: error.message
        });
    }
};