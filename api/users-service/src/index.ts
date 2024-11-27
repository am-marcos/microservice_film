require('dotenv').config();
import express from 'express';
import connectDB from './database/database';
import userRoutes from './routes/userRoutes';
import logger from './middleware/logger';
import errorHandler from './middleware/errorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// Middleware de journalisation
app.use(logger);

// Setup Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to the database
connectDB();

// Use user routes
app.use('/api', userRoutes);

// Middleware de gestion des erreurs
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
