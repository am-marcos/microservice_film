import express, { Request, Response } from 'express';
import authRoutes from './routes/auth.routes';
import { connectDatabase } from './controllers/database.controller';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swaggers/swagger";
require('dotenv').config();

const app = express();

const PORT: number = parseInt(process.env.PORT as string, 10) || 9001;

app.use(express.json());

connectDatabase();

app.get('/', (req: Request, res: Response) => {
  res.send("Hello from auth-service");
});
app.use('/api/auth', authRoutes);
app.use("/api/auth/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

export default app;