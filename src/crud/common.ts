import { Defaults } from 'pg';
import Client from '../database';

const index = <T>( name:string) => {
    return async function():Promise<T[]> {
        try {
            const conn = await Client.connect();
            const sql = `SELECT * FROM ${name}s`;
    
            const result = await conn.query(sql);
    
            conn.release();
    
            return result.rows;
        } catch (err) {
            throw new Error(`Could not get ${name}s. Error: ${err}`);
        }
    }
}

const show = <T>(name:string) => {
    return async function(id:string):Promise<T> {
        try {
            const sql = `SELECT * FROM ${name}s WHERE id=($1)`;
            const conn = await Client.connect();

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find ${name} ${id}. Error: ${err}`);
        }
    }
}

const destroy = <T>(name:string) => {
    return async function(id:string):Promise<T> {
        try {
            const sql = `DELETE FROM ${name}s WHERE id=($1)`;
            const conn = await Client.connect();

            const result = await conn.query(sql, [id]);
            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Failed to delete. Error: ${err}`);
        }
    }
}

const crud = {index, show, destroy};

export default crud;
