import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';

const store = new UserStore();

const index = async (_req: Request, res: Response): Promise<void> => {
    const users = await store.index();
    res.json(users);
};

const user_routes = (app: express.Application): void => {
    app.get('/users', index);
    app.get('/users/:id', async (req, res) => {
        try {
            const user = await store.show(req.params.id);
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    });
    app.post('/users', async (req, res) => {
        const user: User = {
            id: 1,
            firstName: req.body.first,
            lastName: req.body.last,
            password: req.body.password,
        };
        try {
            const created = await store.create(user);
            res.json(created);
        } catch (err) {
            res.json(err);
        }
    });
    app.put('/users', async (req, res) => {
        const columns = JSON.parse(req.body.columns);
        const values = JSON.parse(req.body.values);
        // const columns = req.body.columns;
        // const values = req.body.values;
        try {
            const updated = await store.update(req.body.id, columns, values);
            res.json(updated);
        } catch (err) {
            res.json(err);
        }
    });
    app.delete('/users', async (req, res) => {
        try {
            const user = await store.destroy(req.body.id);
            res.json(user);
        } catch (err) {
            res.json(err);
        }
    });
};

export default user_routes;
