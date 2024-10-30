import { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import logger from '../logger';

export default (stripe: Stripe) => {
  const router = Router();

  // Route pour créer un Payment Intent
  router.post('/create-payment-intent', async (req: Request, res: Response) => {
    try {
      const { amount } = req.body;
      logger.info('Tentative de création du Payment Intent', { amount });

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'eur',
        payment_method_types: ['card'],
      });

      logger.info('Payment Intent créé avec succès', { paymentIntentId: paymentIntent.id });
      res.status(200).json({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      logger.error('Erreur lors de la création du Payment Intent', { error });
      res.status(500).json({ error: 'Une erreur est survenue lors du paiement.' });
    }
  });

  // Route pour vérifier le statut d'un paiement
  router.get('/confirm-payment/:id', async (req: Request, res: Response) => {
    try {
      const paymentIntentId = req.params.id;
      logger.info('Tentative de confirmation du Payment Intent', { paymentIntentId });

      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      logger.info('Statut actuel du Payment Intent', { status: paymentIntent.status });

      if (paymentIntent.status === 'succeeded') {
        res.status(200).json({ status: 'succeeded' });
      } else {
        res.status(400).json({ status: paymentIntent.status });
      }
    } catch (error) {
      logger.error('Erreur lors de la vérification du Payment Intent', { error });
      res.status(500).json({ error: 'Une erreur est survenue lors de la vérification du paiement.' });
    }
  });

  return router;
};
