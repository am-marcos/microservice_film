import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/index';
import { Server } from 'http';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

let server: Server;

beforeAll(async () => {
  server = app.listen(9002, () => {
    console.log('Test server running on port 9002');
  });
});

afterAll(async () => {
  server.close(() => {
    console.log('Test server closed');
  });
});

describe('Catalog API', () => {
  let catalogId: string;

  it('should create a new catalog', async () => {
    const response = await request(app)
      .post('/api/catalogs')
      .send({
        picture: 'http://example.com/picture.jpg',
        title: 'New Catalog',
        summary: 'This is a new catalog',
        release_date: '2023-01-01',
        author: 'Author Name',
        duration: 120,
        genre: 'Genre',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    catalogId = response.body._id;
  });

  it('should handle error when creating a new catalog', async () => {
    const response = await request(app)
      .post('/api/catalogs')
      .send({});
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Erreur lors de la création du catalogue');
  });

  it('should get a catalog by ID', async () => {
    const response = await request(app).get(`/api/catalogs/${catalogId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', catalogId);
  });

  it('should handle error when getting a catalog by invalid ID', async () => {
    const response = await request(app).get('/api/catalogs/invalid-id');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Erreur lors de la récupération du catalogue');
  });

  it('should get all catalogs', async () => {
    const response = await request(app).get('/api/catalogs');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should update a catalog by ID', async () => {
    const response = await request(app)
      .put(`/api/catalogs/${catalogId}`)
      .send({
        picture: 'http://example.com/updated_picture.jpg',
        title: 'Updated Catalog',
        summary: 'This is an updated catalog',
        release_date: '2023-01-02',
        author: 'Updated Author Name',
        duration: 130,
        genre: 'Updated Genre',
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', catalogId);
    expect(response.body.title).toBe('Updated Catalog');
  });

  it('should handle error when updating a catalog with invalid ID', async () => {
    const response = await request(app)
      .put('/api/catalogs/invalid-id')
      .send({
        picture: 'http://example.com/updated_picture.jpg',
        title: 'Updated Catalog',
        summary: 'This is an updated catalog',
        release_date: '2023-01-02',
        author: 'Updated Author Name',
        duration: 130,
        genre: 'Updated Genre',
      });
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Erreur lors de la mise à jour du catalogue');
  });

  it('should delete a catalog by ID', async () => {
    const response = await request(app).delete(`/api/catalogs/${catalogId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Catalogue supprimé avec succès');
  });

  it('should handle error when deleting a catalog with invalid ID', async () => {
    const response = await request(app).delete('/api/catalogs/invalid-id');
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('message', 'Erreur lors de la suppression du catalogue');
  });
}); 
