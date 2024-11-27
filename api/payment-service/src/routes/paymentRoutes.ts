import { Router, Request, Response } from "express";
import Stripe from "stripe";
import logger from "../logger";
import Payment from "../models/paymentModel";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

export default (stripe: Stripe) => {
    const router = Router();

    // Créer un Payment Intent
    router.post("/create-payment-intent", async (req: AuthenticatedRequest, res: Response) => {
        try {
            const { amount } = req.body;
            logger.info("Création du Payment Intent", { amount, user: req.user });

            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: "eur",
                payment_method_types: ["card"],
            });

            res.status(200).json({ clientSecret: paymentIntent.client_secret });
        } catch (error) {
            logger.error("Erreur lors de la création du Payment Intent", { error });
            res.status(500).json({ error: "Une erreur est survenue." });
        }
    });

    // Confirmer un paiement
    router.get("/confirm-payment/:id", async (req: AuthenticatedRequest, res: Response) => {
        try {
            const paymentIntentId = req.params.id;
            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

            if (paymentIntent.status === "succeeded") {
                const payment = new Payment({
                    paymentIntentId: paymentIntent.id,
                    amount: paymentIntent.amount,
                    currency: paymentIntent.currency,
                    status: paymentIntent.status,
                });
                await payment.save();

                res.status(200).json({ status: "Paiement réussi !" });
            } else {
                res.status(400).json({ status: paymentIntent.status });
            }
        } catch (error) {
            logger.error("Erreur lors de la confirmation du paiement", { error });
            res.status(500).json({ error: "Une erreur est survenue." });
        }
    });

    return router;
};
