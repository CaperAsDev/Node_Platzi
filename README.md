# Docker 📦

## Images Used:

- [Phpmyadmin](https://hub.docker.com/_/phpmyadmin): Interface for mysql db
- [PgAdmin4](https://hub.docker.com/r/dpage/pgadmin4): Interface for postgres db
- [Mysql](https://hub.docker.com/_/mysql): MySQL db
- [Postgres](https://hub.docker.com/_/postgres): PostgreSQL db

## Install DOCKER 🥸

[Old versions](https://gist.github.com/kupietools/2f9f085228d765da579f0f0702bec33c)

## Info links

- [DockerHub](https://hub.docker.com/) search for Docker images
- [Using Docker VSC Extension](https://learn.microsoft.com/es-es/visualstudio/docker/tutorials/docker-tutorial?WT.mc_id=vscode_docker_aka_getstartedwithdocker)
 
## Starting

- Create the docker-compose.yml file with the instructions to build the containers
- In this case we compose a postgres db, but i have already installed postgres so the port 5432 is in use, to check the availability of a port check the ports in use with **sudo lsof -nP -iTCP -sTCP:LISTEN** this will show the ports listening or use **sudo lsof -nP -i:[port-number]** to see an specific port.
  - To kill the process running in the port 5432, identify the PID of the process with the prev command and use **sudo kill [PID]** or **sudo kill -9 [PID]** to stop it forcefully.

# Clean architecture 🧹

## Routes:

Routes manage requests and responses
- Routes call their respective service methods

## Services:

Business logic:
- One service per Entity
- Services get the information from Libraries

## Libraries:

Connection to Data sources:
- Initialize DataBase
- pgConnection: use pg to connect node with postgresql db
- sequelize.postgres: use Sequelize to connect with a postgres db
- sequelize.mysql: use Sequelize to connect with a mysql db

## db 🗂

### Models:

Database table structure
- One model per Entity
- DB Tables are initialized on library level

# Sequelize

## Nested queries

```
  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    });
    return orders;
  }
```

## Migrations

Migrations should run in production, while developing we can sync the db with **sequelize.sync({alter: true})** or **sequelize.sync({force: true})**. Usign force will create from zero the db with the changes, alter will modify the database when is possible, if there are changes that affect the existing data it won't work.

### Configuration

- Install Sequelize cli
- Create [sequelizerc file](https://sequelize.org/docs/v6/other-topics/migrations/#the-sequelizerc-file)
- Create [files and folders](https://sequelize.org/docs/v6/other-topics/migrations/#project-bootstrapping) with npx sequelice-cli init or create the folder structure manually.
- The Sequelizerc file indicates the location of the folders defined in the above step.
- Configure the scrips to run migration in the package.json:

```
  "migrations:generate": "sequelize-cli migration:generate --name",
  "migrations:run": "sequelize-cli db:migrate",
  "migrations:revert": "sequelize-cli db:migrate:undo",
  "migrations:delete": "sequelize-cli db:migrate:undo:all" 
```

### Migration:

- run the **migrations:generate** script followed by the **migration name**:
`bun run migrations:generate add-character-attribute`: 'add-character-attribute' is the migration name.
* the name of the created file should look something like this: `20240413162817-add-character-attribute.js`
This script will create a boilerplate file in the migrations directory, in the migration file we have to define what changes will occur to our database, from create a new table to add a new column, each change have to be specified on it to be done when the migration is run.
- With the migration file ready, run the script **migrations:run** and wait for the migration to finish.
- If the migration finishes without any errors, the changes should have been applied to the database.

[Documentation](https://sequelize.org/docs/v6/other-topics/migrations)

# Authentication & Authorization

## Authentication : 

- Who you are
- Validate the username and password.

## Authorization :

- What are you able to do
- Routes protection
- Access to certain functionalities according to user privileges

## JWT

[Generate secret key](https://keygen.io/#fakeLink)

## Auth Strategies

When using passport, you will get the payload in the req.user for the next middleware.

## Refresh Token

There could be an access token that expires after 20 minutes and a Refresh token that is used to genereate a new access token.

# [NodeMailer](https://www.nodemailer.com/)

[app passwords](https://support.google.com/accounts/answer/185833?hl=es-419&sjid=5607186331530498619-NA)

# Repos

- [curso-nodejs-auth](https://github.com/platzi/curso-nodejs-auth/tree/13-step)
- [curso-nodejs-graphql](https://github.com/platzi/curso-nodejs-graphql/tree/step-1-init)
