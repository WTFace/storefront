import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';
import verifyAuthToken from '../middleware/auth';

const store = new ProductStore();

const index = async (_req: Request, res: Response): Promise<void> => {
    const products = await store.index();
    res.json(products);
};

const product_routes = (app: express.Application): void => {
    app.get('/products', index);
    app.get('/products/:id', async (req, res) => {
        try {
            const product = await store.show(req.params.id);
            res.json(product);
        } catch (err) {
            res.status(400).json(err);
        }
    });
    app.post('/products', verifyAuthToken, async (req, res) => {
        const product: Product = {
            id: 1,
            name: req.body.name,
            price: req.body.price,
        };
        try {
            const created = await store.create(product);
            res.json(created);
        } catch (err) {
            res.json(err);
        }
    });
};

export default product_routes;
