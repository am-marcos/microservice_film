require('dotenv').config();
import express from 'express';
import catalogRoutes from './routes/catalogRoute';
import { connectDB } from './configDB/configDB';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig';

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use('/api', catalogRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Connect to the database
connectDB();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

console.log('Hello from catalog service');

export default app;
