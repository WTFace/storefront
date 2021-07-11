

## API Endpoints
For APIs require token, get token by POST request to 
- endpoint: `/users` [POST]
- body: firstname, lastname, password [JSON]

Then add the returned token to request header
- key: `Authorization`
- value: `Bearer token`

#### Products
- Index GET '/products'
- Show GET '/produts/:id'
- Create POST '/products' [token required]

#### Users
- Index GET '/users' [token required]
- Show GET '/users/:id' [token required]
- Create POST '/users' N[token required]

#### Orders
- Current Order by user GET '/orders/:user_id' [token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Schema
#### Product
- id SERIAL PRIMARY KEY,
- name VARCHAR(64) NOT NULL,
- price INTEGER NOT NULL DEFAULT 0

#### User
- id SERIAL PRIMARY KEY,
- firstname VARCHAR(30) NOT NULL,
- lastname VARCHAR(30) NOT NULL,
- password VARCHAR NOT NULL

#### Orders
- id SERIAL PRIMARY KEY,
- status VARCHAR(15) DEFAULT 'active',
- user_id int REFERENCES users(id)

### order_products
- id SERIAL PRIMARY KEY,
- quantity integer,
- order_id int REFERENCES orders(id),
- product_id int REFERENCES products(id)
