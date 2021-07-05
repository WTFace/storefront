import Client from '../database';
import crud from '../crud/common';

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    password: string;
};

export class UserStore {
    public index;
    public show;
    public destroy;
    public update;

    constructor() {
        const table = 'users';
        this.index = crud.index<User>(table);
        this.show = crud.show<User>(table);
        this.destroy = crud.destroy<User>(table);
        this.update = crud.update<User>(table);
    }

    async create(u: User): Promise<User> {
        try {
            const sql =
                'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';
            const conn = await Client.connect();

            const result = await conn.query(sql, [
                u.firstName,
                u.lastName,
                u.password,
            ]);

            const row = result.rows[0];
            conn.release();
            return row;
        } catch (err) {
            throw new Error(`Could not add a new row. Error: ${err}`);
        }
    }
}
