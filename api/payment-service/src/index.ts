import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import paymentRoutes from "./routes/paymentRoutes";
import authMiddleware from "./middleware/authMiddleware";
import mongoose from "mongoose";
import winston from "winston";

// Configuration de dotenv
dotenv.config();

// Configuration de Winston pour les logs
const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(
            ({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`
        )
    ),
    transports: [
        new winston.transports.Console(), // Affiche dans la console
        new winston.transports.File({ filename: "logs/app.log" }), // Sauvegarde dans un fichier
    ],
});

// Initialisation de l'application
const app = express();
app.use(express.json());

// Initialisation de Stripe
if (!process.env.STRIPE_SECRET_KEY) {
    logger.error("❌ STRIPE_SECRET_KEY manquant dans .env");
    process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-11-20.acacia",
});

// Connexion à MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "");
        logger.info("✅ MongoDB connecté avec succès !");
    } catch (error) {
        logger.error(`❌ Erreur de connexion à MongoDB : ${error}`);
        process.exit(1); // Arrête l'application si la connexion échoue
    }
};

connectDB();

// Middleware de log pour chaque requête
app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(`➡️ Requête reçue : ${req.method} ${req.url}`);
    next();
});

// Routes
app.use("/api/payment", authMiddleware, paymentRoutes(stripe));

// Gestion des erreurs globales
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(`❌ Erreur : ${err.message}`);
    res.status(500).json({ error: "Une erreur interne est survenue." });
});

// Route par défaut pour vérifier le bon fonctionnement
app.get("/", (req: Request, res: Response) => {
    res.send("Service de paiement opérationnel !");
});

// Démarrage du serveur
const PORT = process.env.PORT || 9005;
app.listen(PORT, () => {
    logger.info(`🚀 Service de paiement en cours d'exécution sur le port ${PORT}`);
});
