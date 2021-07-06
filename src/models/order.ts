import Client from '../database';
import crud from '../crud/common';

export type Order = {
    id: number;
    status: string;
    user_id: number;
};

export class OrderStore {
    public index;
    public show;

    constructor() {
        const table = 'orders';
        this.index = crud.index<Order>(table);
        this.show = crud.show<Order>(table);
    }

    async create(user_id: number): Promise<Order> {
        try {
            const sql = 'INSERT INTO orders (user_id) VALUES($1) RETURNING *';
            const conn = await Client.connect();
            const result = await conn.query(sql, [user_id]);
            const row = result.rows[0];
            conn.release();
            return row;
        } catch (err) {
            throw new Error(`Could not add a new row. Error: ${err}`);
        }
    }

    async addProduct(
        quantity: number,
        orderId: string,
        product_id: string
    ): Promise<Order> {
        try {
            const sql =
                'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
            const conn = await Client.connect();

            const result = await conn.query(sql, [
                quantity,
                orderId,
                product_id,
            ]);

            const row = result.rows[0];
            conn.release();
            return row;
        } catch (err) {
            throw new Error(
                `Could not add product ${product_id} to order ${orderId}: ${err}`
            );
        }
    }

    async ordersByUser(): Promise<{ firstName: string; lastName: string }[]> {
        try {
            const conn = await Client.connect();
            const sql =
                'SELECT orders.id FROM users INNER JOIN orders ON users.id = orders.user_id';

            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`unable get users with orders: ${err}`);
        }
    }
}
