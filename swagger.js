const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Film Catalog API',
        description:
            'REST API for managing movies and reviews in a film catalog.',
        version: '1.0.0'
    },
    host: 'localhost:8080',
    schemes: ['http'],
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
        }
    ]
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);