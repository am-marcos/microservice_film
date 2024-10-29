import jwt from 'jsonwebtoken';

export const generateToken = (userId: string) => {
    return jwt.sign({ userId }, `${process.env.SECRET_KEY}`, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, `${process.env.SECRET_KEY}`);
};