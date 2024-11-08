import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentation de l\'API',
      version: '1.0.0',
    },
    components: {
      schemas: {
        Catalog: {
          type: 'object',
          required: ['picture', 'title', 'summary', 'release_date', 'author', 'duration', 'genre'],
          properties: {
            picture: {
              type: 'string',
              description: 'URL de l\'image du catalogue',
            },
            title: {
              type: 'string',
              description: 'Titre du catalogue',
            },
            summary: {
              type: 'string',
              description: 'Résumé du catalogue',
            },
            release_date: {
              type: 'string',
              format: 'date',
              description: 'Date de sortie du catalogue',
            },
            author: {
              type: 'string',
              description: 'Auteur du catalogue',
            },
            duration: {
              type: 'number',
              description: 'Durée du catalogue en minutes',
            },
            genre: {
              type: 'string',
              description: 'Genre du catalogue',
            },
          },
        },
      },
    },
  },
  apis: [path.resolve(__dirname, './routes/catalogRoute.ts')],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;