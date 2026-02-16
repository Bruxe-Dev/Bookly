const { version } = require('joi')
const swaggerJsdoc = require('swagger-jsdoc')

const options = {
    definition: {
        openapi: '3.0.0',

        info: {
            title: 'Bookly API',
            version: '1.0.0',
            description: `
        A comprehensive REST API for managing an online bookstore.
        
        Features:
        - Browse and search books
        - Filter by category, price, rating, year
        - Sort by any field (price, rating, title, etc.)
        - Pagination support
        - Full CRUD operations
        - Statistics and analytics
      `,
            contact: {
                name: "Bookly API support",
                email: 'mnibeza23@gmail.com'
            },
            lisence: {
                name: 'MIT',
                url: "https://opensource.org/lisences/MIT"
            }
        },

        servers: [
            {
                url: "http://localhost:4040",
                description: "Development Server"
            },

            {
                url: "https://api.booklyonline.com",
                description: "Deployment Server (Production Server)"
            }
        ]
    }
}