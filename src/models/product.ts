import Client from '../database';
import crud from '../crud/common';

export type Product = {
    id: number;
    name: string;
    price: number;
};

export class ProductStore {
    public index;
    public show;

    constructor() {
        const table = 'products';
        this.index = crud.index<Product>(table);
        this.show = crud.show<Product>(table);
    }

    async create(m: Product): Promise<Product> {
        try {
            const sql =
                'INSERT INTO products ( name, price) VALUES($1, $2) RETURNING *';
            const conn = await Client.connect();

            const result = await conn.query(sql, [m.name, m.price]);

            const row = result.rows[0];
            conn.release();
            return row;
        } catch (err) {
            throw new Error(`Could not add a new row. Error: ${err}`);
        }
    }
}
