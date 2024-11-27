import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    user?: any; // Étend le type Request pour inclure user
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ error: "Accès non autorisé. Token manquant." });
        return; // Assurez-vous que la fonction s'arrête ici
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
        req.user = decoded; // Ajoute l'utilisateur décodé à la requête
        next(); // Passe au middleware suivant
    } catch (error) {
        res.status(401).json({ error: "Token invalide ou expiré." });
        return; // Assurez-vous que la fonction s'arrête ici
    }
};

export default authMiddleware;
