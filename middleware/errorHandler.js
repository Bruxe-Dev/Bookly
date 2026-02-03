function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;

    if (statusCode >= 400 && statusCode < 500) {
        res.status(statusCode).send({
            status: statusCode,
            message: err.message
        });
    } else {
        console.error('Internal Error:', err.message);
        res.status(statusCode).send({
            status: statusCode,
            message: 'An internal server error occurred. Please try again later.'
        });
    }
}

module.exports = errorHandler;