import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/index';
import { Server } from 'http';
import dotenv from 'dotenv';
import exp from 'constants';
import User from '../src/models/user-model';

dotenv.config({ path: '.env.test' });
console.log(process.env.PORT);


let server: Server;

beforeAll(async () => {
    server = app.listen(process.env.PORT, () => {
        console.log('Test server running on port 9002');
    });
    await User.deleteMany({});
});

afterAll(async () => {
    server.close(() => {
        console.log('Test server closed');
    });
});

describe('Auth API', () => {
    let token: string;

    it('should register a new user', async () => {
        const response = await request(app).post('/api/auth/register').send({
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password123',
            status: 'active',
        });
        expect(response.body.statusCode).toBe(201);
        expect(response.body.message).toBe('Utilisateur enregistré avec succès');

    });

    it('should handle error when registering with existing email', async () => {
        const response = await request(app).post('/api/auth/register').send({
            name: 'Test User',
            email: 'testuser@example.com',
            password: 'password123',
            status: 'active',
        });
        expect(response.body.statusCode).toBe(409);
        expect(response.body.message).toBe('Un utilisateur avec cet email existe déjà');
    });

    it('should login a user', async () => {
        const response = await request(app).post('/api/auth/login').send({
            email: 'testuser@example.com',
            password: 'password123',
        });
        expect(response.body.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
        token = response.body.token;
    });

    it('should handle error when logging in with incorrect password', async () => {
        const response = await request(app).post('/api/auth/login').send({
            email: 'testuser@example.com',
            password: 'wrongpassword',
        });
        expect(response.body.statusCode).toBe(401);
        expect(response.body.message).toBe('Email ou mot de passe incorrect');
    });

    it('should handle error when logging in with non-existent email', async () => {
        const response = await request(app).post('/api/auth/login').send({
            email: 'nonexistent@example.com',
            password: 'password123',
        });
        expect(response.body.statusCode).toBe(401);
        expect(response.body.message).toBe('Email ou mot de passe incorrect');
    });
});