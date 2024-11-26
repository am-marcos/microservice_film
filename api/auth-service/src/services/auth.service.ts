import User from '../models/user-model';
import { comparePassword } from '../utils/password.utils';
import { generateToken } from '../utils/token.utils';
import { loginSchema, registerSchema } from '../models/validation.model';

export class AuthService {

    static async register(name: string, email: string, password: string, status: string): Promise<{ message: string, statusCode: number }> {
        try {
            const { error } = registerSchema.validate({ name, email, password, status });
            if (error) {
                return { message: error.details[0].message, statusCode: 400 };
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return { message: 'Un utilisateur avec cet email existe déjà', statusCode: 409 };
            }

            const user = new User({ name, email, password, status });
            await user.save();
            return { message: 'Utilisateur enregistré avec succès', statusCode: 201 };
        } catch (err) {
            return { message: 'Erreur lors de l\'enregistrement de l\'utilisateur', statusCode: 500 };
        }
    }

    static async login(email: string, password: string): Promise<{ message: string, token?: string, statusCode: number }> {
        try {
            const { error } = loginSchema.validate({ email, password });
            if (error) {
                return { message: error.details[0].message, statusCode: 400 };
            }

            const user = await User.findOne({ email }) as { _id: string, password: string };
            if (!user) {
                return { message: 'Email ou mot de passe incorrect', statusCode: 401 };
            }

            const isMatch = await comparePassword(password, user.password);
            if (!isMatch) {
                return { message: 'Email ou mot de passe incorrect', statusCode: 401 };
            }

            const token = generateToken(user._id.toString());
            return { message: 'Connexion réussie', token, statusCode: 200 };
        } catch (err) {
            return { message: 'Erreur lors de la connexion', statusCode: 500 };
        }
    }
}