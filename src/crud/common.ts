import Client from '../database';

const index = <T>(table: string) => {
    return async function (): Promise<T[]> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM ${table}`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get ${table}. Error: ${err}`);
        }
    };
};

const show = <T>(table: string) => {
    return async function (id: string): Promise<T> {
        try {
            const sql = `SELECT * FROM ${table} WHERE id=($1)`;
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find id ${id}. Error: ${err}`);
        }
    };
};

const destroy = <T>(table: string) => {
    return async function (id: string): Promise<T> {
        try {
            const sql = `DELETE FROM ${table} WHERE id=($1)`;
            const conn = await Client.connect();
            const result = await conn.query(sql, [id]);

            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Failed to delete. Error: ${err}`);
        }
    };
};

const update = <T>(table: string) => {
    return async function (
        id: string,
        columns: string[],
        values: any[]
    ): Promise<T> {
        let statement = '';
        let i = 1;
        for (const column of columns) {
            if (i > 1) {
                statement += ',';
            }
            statement += `${column} = $${i}`;
            i += 1;
        }
        const sql = `UPDATE ${table} SET ${statement} WHERE id = ${id}`;
        try {
            const conn = await Client.connect();
            const result = await conn.query(sql, values);

            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Failed to update. Error: ${err}`);
        }
    };
};

const crud = { index, show, update, destroy };

export default crud;
