const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    // Log the error for debugging
    console.error(`[ERROR] ${err.message}`);
    if (process.env.NODE_ENV === 'development') {
        console.error(err.stack);
    }

    // Send appropriate response based on status code
    if (statusCode >= 400 && statusCode < 500) {
        res.status(statusCode).json({
            success: false,
            message: err.message,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
        });
    } else {
        // Server errors (5xx) - hide details from client
        res.status(statusCode).json({
            success: false,
            message: 'An internal server error occurred',
            ...(process.env.NODE_ENV === 'development' && {
                actualError: err.message,
                stack: err.stack
            })
        });
    }
};

module.exports = errorHandler;