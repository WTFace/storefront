

## API Endpoints
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

## Data Shapes
#### Product
-  id
- name
- price

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)
