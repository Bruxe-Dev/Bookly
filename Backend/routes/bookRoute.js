require('dotenv').config();
const express = require('express');
const router = express.Router();

const {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    getStatistics,
} = require('../controllers/bookController');

router.get('/statistics', getStatistics);

router.route('/')
    .get(getBooks)
    .post(createBook)

router.route('/:id')
    .get(getBookById)
    .put(updateBook)
    .delete(deleteBook)

module.exports = router