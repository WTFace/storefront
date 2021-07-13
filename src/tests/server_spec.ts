import supertest from 'supertest';
import app from '../server';

const request = supertest(app);
describe('Test endpoint responses', () => {
    it('GET products index', async (done) => {
        const response = await request.get(
            '/products'
        );
        expect(response.status).toBe(200);
        done();
    });

    it('POST products without token', async (done) => {
        const response = await request.post(
            '/products'
        );
        expect(response.status).toBe(401);
        done();
    });
});
