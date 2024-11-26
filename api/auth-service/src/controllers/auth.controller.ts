import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, email, password, status = '' } = req.body;

    try {
        const message = await AuthService.register(name, email, password, status);
        res.status(201).send(message);
    } catch (err) {
        console.error('Erreur lors de l\'enregistrement:', err);
        next(err);
    }
};
export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    try {
        const result = await AuthService.login(email, password);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};