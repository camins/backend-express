# backend-express-financial-app
Backend of a finance and employee control application using:
* Express;
* JWT authentication;
* Sequelize to connect with databases;
* Sentry for error monitoring;
* Multer for uploading files;

# Pre-requisites
- Docker with Postgres (`docker run --name database_projetoreal -e POSTGRES_PASSWORD=admin -p 5432:5432 -d postgres`)

# Setup
To begin with, the following steps should be followed:
* Clone repository
* Run `yarn install`
* Rename the `.env.example` file to `.env`
* Configure the `.env` file
* Run `yarn run dev`

