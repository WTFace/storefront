import supertest from 'supertest';
import app from '../server';

const request = supertest(app);
describe('Test endpoint responses', () => {
    let token: string;
    it('index products index 200', async (done) => {
        const response = await request.get(
            '/products'
        );
        expect(response.status).toBe(200);
        done();
    });
    it('show products index 200', async (done) => {
        const response = await request.get(
            '/products/1'
        );
        expect(response.status).toBe(200);
        done();
    });

    it('POST products without token 401', async (done) => {
        const response = await request.post(
            '/products'
        );
        expect(response.status).toBe(401);
        done();
    });

    it('POST users will return a token', async (done) => {
        const user = {
            firstname: 'first',
            lastname: 'last',
            password: 'simplepw'
        }
        const response = await request.post(
            '/users'
        )
        .send(user);
        token = response.body;
        expect(token.split('.').length).toEqual(3);
        done();
    });

    it('index users with token 200', async (done) => {
        const response = await request.get(
            '/users'
        )
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toEqual(200);
        done();
    });

    it('show users with token 200', async (done) => {
        const response = await request.get(
            '/users/1'
        )
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toEqual(200);
        done();
    });

    it('orders by user with token 200', async (done) => {
        const response = await request.get(
            '/orders/1'
        )
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toEqual(200);
        done();
    });
    
});
