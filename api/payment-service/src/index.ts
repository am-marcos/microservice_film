import express from 'express';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import paymentRoutes from './routes/paymentRoutes';

dotenv.config();

const app = express();
app.use(express.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-09-30.acacia',
});

// Passe l'instance de Stripe aux routes pi_3QIoIgA2lJMJiBMR16ulDbHp_secret_kAZwzU5d1PArzP8Wb6lMwZuUQ
app.use('/api/payment', paymentRoutes(stripe));

const PORT = process.env.PORT || 9005;
app.listen(PORT, () => {
  console.log(`Payment service is running on port ${PORT}`);
});
