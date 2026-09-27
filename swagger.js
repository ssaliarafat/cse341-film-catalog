const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Film Catalog API',
        description:
            'REST API for managing movies and reviews in a film catalog, with GitHub OAuth authentication.',
        version: '1.0.0'
    },

    host: 'cse341-film-catalog.onrender.com',
    schemes: ['https'],
    consumes: ['application/json'],
    produces: ['application/json'],

    tags: [
        {
            name: 'Movies',
            description: 'Movie management endpoints'
        },
        {
            name: 'Reviews',
            description: 'Movie review management endpoints'
        },
        {
            name: 'Authentication',
            description: 'GitHub OAuth authentication endpoints'
        },
        {
            name: 'Users',
            description: 'Authenticated user information'
        }
    ]
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);