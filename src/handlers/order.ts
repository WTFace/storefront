import express, { Request, Response } from 'express';
import { OrderStore } from '../models/order';
import verifyAuthToken from '../middleware/auth';

const store = new OrderStore();

const index = async (_req: Request, res: Response): Promise<void> => {
    const orders = await store.index();
    res.json(orders);
};

const order_routes = (app: express.Application): void => {
    app.get('/orders', index);
    app.get('/orders/:id', async (req, res) => {
        try {
            const order = await store.show(req.params.id);
            res.json(order);
        } catch (err) {
            res.status(400).json(err);
        }
    });
    app.post('/orders/:user_id', async (req, res) => {
        try {
            const created = await store.create(Number(req.params.user_id));
            res.json(created);
        } catch (err) {
            res.json(err);
        }
    });
    app.post('/orders/:id/add', async (req, res) => {
        try {
            const order = await store.addProduct(
                req.body.number,
                Number(req.params.id),
                req.body.product_id
            );
            res.json(order);
        } catch (err) {
            res.status(400).json(err);
        }
    });
    app.get('/orders/:user_id', verifyAuthToken, async (req, res) => {
        try {
            const orders = await store.ordersByUser(Number(req.params.user_id));
            res.json(orders);
        } catch (err) {
            res.json(err);
        }
    });
};

export default order_routes;
