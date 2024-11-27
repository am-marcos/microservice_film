require('dotenv').config();
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import logger from './middleware/logger';
import errorHandler from './middleware/errorHandler';
import routes from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Middleware de journalisation
app.use(logger);

// Routes
app.use('/api', routes);

// Middleware de gestion des erreurs
app.use(errorHandler);

app.listen(port, () => {
    console.log(`API Gateway running on port ${port}`);
});
