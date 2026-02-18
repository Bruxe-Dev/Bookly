const { version, required } = require('joi')
const { Component } = require('react')
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
        ],

        tags: [
            {
                names: 'books',
                description: "Books managment and browsing endpoints"
            },

            {
                names: 'statistics',
                description: "Analytics and statistics endpoints"
            }
        ],

        Components: {
            Schemas: {
                Book: {
                    type: 'object',
                    required: ['title', 'author', 'price', 'category', 'publisher', 'year', 'rating', 'stock'],
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Book MongoDB Objectid',
                            example: '507f1g677bcf86cd799439011'
                        },
                        title: {
                            type: 'string',
                            description: 'Name of the book',
                            minLength: 1,
                            maxLength: 200,
                            example: 'Clean Code'
                        },
                        author: {
                            type: 'string',
                            description: 'Book author name',
                            example: 'Robert C Martin'
                        }
                    }
                }
            }
        }
    }
}


const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;