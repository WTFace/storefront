/* Replace with your SQL commands */
-- CREATE USER full_stack_js WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE full_stack_js TO postgres;
GRANT ALL PRIVILEGES ON DATABASE test TO postgres;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(30) NOT NULL,
    lastname VARCHAR(30) NOT NULL,
    password VARCHAR NOT NULL
);
