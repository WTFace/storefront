# Storefront Backend Project

## ENV
Values for Postgresql connection in .env
- POSTGRES_HOST
- POSTGRES_DB
- POSTGRES_USER
- POSTGRES_PASSWORD
- POSTGRES_TEST_DB
- ENV  

Other values in .env
- SALT_ROUND for bcrypt
- TOKEN_SECRET for JWT

Port is 5432 if you don't specify in options in `database.ts`

Create two db in Postgresql
`Create database full_stack_js;`
`Create database test;` 

Run migration
`db-migrate up`

## Install packages
`npm install`  

## Test
Change ENV to test in .env file first.    
Then run `npm run test`

## Lint
`npm run lint`

## watch
`npm run watch`
