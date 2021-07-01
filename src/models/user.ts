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

    constructor(){
        this.index = crud.index<User>('user');
        this.show = crud.show<User>('user');
        this.destroy = crud.destroy<User>('user');
    }

    async create(u: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *';
            const conn = await Client.connect();

            const result = await conn.query(sql, [
                u.firstName,
                u.lastName,
                u.password,
            ]);

            const user = result.rows[0];
            conn.release();
            return user;
        } catch (err) {
            throw new Error(`Could not add new user. Error: ${err}`);
        }
    }
}
