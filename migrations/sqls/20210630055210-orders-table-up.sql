/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15) DEFAULT 'active',
    user_id int REFERENCES users(id)
);