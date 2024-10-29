import User from '../models/user-model';
import { comparePassword } from '../utils/password.utils';
import { generateToken } from '../utils/token.utils';
import { loginSchema, registerSchema } from '../models/validation.model';

export class AuthService {

    static async register(name: string, email: string, password: string, status: string): Promise<string> {
        const { error } = registerSchema.validate({ name, email, password, status });
        if (error) {
            throw new Error(error.details[0].message);
        }

        const user = new User({ name, email, password, status });
        user.save();
        return 'Utilisateur enregistré avec succès';
    }

    static async login(email: string, password: string): Promise<{ message: string, token?: string }> {
        const { error } = loginSchema.validate({ email, password });
        if (error) {
            throw new Error(error.details[0].message);
        }

        const user = await User.findOne({ email }) as { _id: string, password: string };
        if (!user) {
            throw new Error('Email ou mot de passe incorrect');
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            throw new Error('Email ou mot de passe incorrect');
        }

        const token = generateToken(user._id.toString());
        return { message: 'Connexion réussie', token };
    }
}