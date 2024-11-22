import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app} from '../index';
import { Server } from 'http';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

let server: Server;

beforeAll(async () => {
    server = app.listen(1234, () => {
        console.log('Test server running on port 1234');
    });
});

afterAll(async () => {
    server.close(() => {
        console.log('Test server closed');
    });
});

describe('Cart API', () => {
    let userId: string;
    let panierId: string;
    let movieId: string;

    it('should create a new Cart', async () => {
        const response = await request(app).get('/api/Cart').send({
            firstName : "John",
            lastName: "Doe",
            mail: "johndo@mail.com",
            status: "suscribe",
            password : "secretpassword",
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
        userId = request.params.id;
    });

    it('should handle error when creating a new Cart', async () => {
        const response = await request(app).post('/api/Cart').send({});
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('message', 'Erreur lors de la création du panier');
    });

    it('should get a Cart by ID', async () => {
        const response = await request(app).post(`/api/Cart/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', userId);
    });

    it('should handle error when getting a Cart by invalid ID', async () => {
        const response = await request(app).get('/api/Cart/invalid-userId');
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty(
            'message',
            'Erreur lors de la récupération du panier',
        );
    });

    it('should update a Cart by ID', async () => {
        const response = await request(app).put(`/api/Cart/${userId}/${panierId}`).send({
            user_id: "12365102352103",
            movies: ["Movie1", "Movie2"]        
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id', userId);
        expect(response.body.title).toBe('Updated Cart');
    });

    it('should delete a Cart by ID', async () => {
        const response = await request(app).delete(`/api/Cart/${panierId}/${movieId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message', 'panier supprimé avec succès');
    });

    it('should handle error when deleting a movie with invalid ID', async () => {
        const response = await request(app).delete('/api/Cart/invalid-userId');
        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty(
            'message',
            'Erreur lors de la suppression du panier',
        );
    });
});