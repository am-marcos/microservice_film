import express, { Request, Response } from 'express';
import authRoutes from './routes/auth.routes';

const app = express();

const PORT: number = parseInt(process.env.PORT as string, 10) || 9001;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send("Hello from auth-service");
});
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

export default app;