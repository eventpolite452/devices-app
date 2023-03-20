# Devices app

## Tech used:

- NestJS (Node.js web framework)
- Vue3
- Vuetify
- Prisma (Node.js ORM)

## Running the project with docker

1. Run `docker-compose build` to build the local images (there is one image which ensures the datbase schema is up to date with migrations, another for the Nest server)
2. Navigate to `localhost:3000` to view the app
3. Optionally, you may use `psql` to connect to the docker postgres instance on 0.0.0.0:5432 and run `\i devices.sql` to import the test data

## Running the project on your local environment

1. Run `npm install` in the root directory to install dependencies for the NestJS server application
2. Run `npm install` in the `src/client` directory to install dependencies for the VueJS client application
3. Run `npx prisma generate` to generate typescript typings from the prisma database schema (required to build the server applications)
4. Create a postgresql database
5. Set the `DATABASE_URL` to a fully qualified database URL, for example `postgresql://user:password@localhost:5432/devicesdb?schema=public`. This may be set via a `.env` file in the root project directory.
6. Run `npm run build:client` to build the VueJS client application
7. Run `npx primsa db push` to apply prisma migrations
8. Run `npm start` in the root directory
9. The app should now be available on `localhost:3000`
3. Optionally, you may use `psql` to connect to the local postgres instance and run `\i devices.sql` to import the test data
