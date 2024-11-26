import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Auth API',
            version: '1.0.0',
            description: 'API de gestion des utilisateurs',
        },
        servers: [
            {
                url: 'http://localhost:9001',
            },
        ],
    },
    apis: ['./src/swaggers/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;