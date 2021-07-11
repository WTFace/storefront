import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import verifyAuthToken from '../middleware/auth';
import jwt from 'jsonwebtoken';

const store = new UserStore();

const index = async (_req: Request, res: Response): Promise<void> => {
    const users = await store.index();
    res.json(users);
};

const user_routes = (app: express.Application): void => {
    app.get('/users', verifyAuthToken, index);
    app.get('/users/:id', verifyAuthToken, async (req, res) => {
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
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        };
        
        try {
            const created = await store.create(user);
            const token = jwt.sign(
                { user: created },
                process.env.TOKEN_SECRET!
            );
            console.log(token);
            res.json(token);
            // res.json(created);
        } catch (err) {
            res.json(err);
        }
    });
    app.put('/users', verifyAuthToken, async (req, res) => {
        const columns = JSON.parse(req.body.columns);
        const values = JSON.parse(req.body.values);
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
