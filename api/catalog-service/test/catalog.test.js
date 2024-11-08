import request from 'supertest';
import app from '../src/app';

describe('Catalog API', () => {
  let catalogId;

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

  it('should get a catalog by ID', async () => {
    const response = await request(app).get(`/api/catalogs/${catalogId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', catalogId);
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

  it('should delete a catalog by ID', async () => {
    const response = await request(app).delete(`/api/catalogs/${catalogId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Catalogue supprimé avec succès');
  });
});