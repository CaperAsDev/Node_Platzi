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

# [Graphql](https://graphql.org/learn/)

## [Graphql Shield](https://the-guild.dev/graphql/shield/docs): for authentication and authorization

## [graphql-passport](https://www.npmjs.com/package/graphql-passport): integration with passport

## [graphql-scalars](https://the-guild.dev/graphql/scalars/docs): type-safe schemas for graphql

Can define new types at resolvers index.js, then add it as a scalar in schema.graphql and use it as a type.

- Graphql needs [Apolo Server](https://www.apollographql.com/docs/apollo-server/getting-started) to make it work.

## Scalar types
This are the types of data that we can assign to the return value or the arg value in a Query:

- Int! => not null
- Float => float optional, can be null
- [String] => An optional array of strings
- [String]! => can't be null and must be an array of strings or a null value
- [String!]! => can't be null and must be an array of strings without null values
- Boolean! => not null, must be a boolean
- ID

If we add a **!** at the end of the type, now this argument or value can't be null, without the mark it will be optional.

If we wrap a type with **[]**, now this means it will receive as argument or return as value an array of the type inside the marks.

## Object types

We can define a type of data with **type** + **TypeName** and the structure:
- Query, Mutation, Subscription, String, Boolean, ID, Int, Float are reserved names that can't be used as identifiers for the custom types.

- We can also use object types to define the type a property in other query:

```
type Query {
  me: User
}
 
type User {
  id: ID
  name: String
}
```

- With Object types we can define structured data, and to query this object we need to be explicit about what subfields or properties we want to be returned:

```
{
  User: {
    name
  }
}
```
In the previous example will be returned only the name, not the id or other properties.

## Importing types from other files

To do so we need to:

- Install @graphql-tools/load-files
- import { loadFiles } from "@graphql-tools/load-files";
- typeDefs: await loadFiles('./src/**/*.graphql'),

## Dynamic Nesting

What usually happens when requesting related models is that in the service there is an include.
In GraphQL we want to include relationships dynamically, so we get only what is required by the client.

- Make the relationship a resolver:

- treat a field as a resolver means that we define in the resolvers index file a property:
```
const resolvers = {
  Query: {
    character: getCharacter,
    characters: getCharacters
  },
  Mutation: {
    addCharacter,
    updateCharacter,
    login
  },
  CharacterNameType,
  Character: {
    element: () => []
  }
}
```
- Take as a example the Character object, this represents the owner of the relationship.
- element will be the field treated as a resolver, in this case when Character is requested with the nested object "element" it will check this resolver to solve that so returns an empty array "[]".
- Element resolver will be called just when that field is requested.
- Create a resolver that will be called when the element field is requested:
```
{
  ...
  Character: {
    elemental: getElementalByCharacter
  }
}

```
- Resolver will receive in its first argument the context or instance that is requesting its relationship:

```
Character {
  dataValues: {
    id: 4,
    name: 'Samantha',
    age: 500,
    nickname: 'Sammy',
    favoriteColor: 'Wine',
    race: 'Vampire',
    favoriteFood: 'Fish',
    ElementalId: 1,
    type: null
  },
  _previousDataValues: {
    id: 4,
    ...
  }
  ...
}

```
- With that information we just have to create a service in the field requested service to solve that relation in the resolver:

```
export const getElementalByCharacter = async (parent) => {
  const element = await service.getElementalByCharacter(parent.dataValues.id)
  return element
}
```
- The service method:
```
async getElementalByCharacter(id){
  const element = await models.Elemental.findOne({where: {id: id}})
  return element
}
```
This way we request just the information needed, in the api Rest we request always that relations.

# Request data from frontend:
Can use:
- Axios & React Query
**Or**
- Apolo/client: better for graphql

- Sin dependencias:
```
const query = `
  query{
    avos{
      id
      image
      name
      createdAt
      sku
      price
      attributes {
        description
        taste
        shape
        hardiness
      }
    }
  }
`

fetch(APIURL/graphql, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query
  })
})
```
 # Frontend types from graphql

 - Install @graphql-codegen/cli
 - Run graphql-codegen init and check documentation for next steps.

 [apollo docs](https://www.apollographql.com/blog/using-apollo-client-with-next-js-13-releasing-an-official-library-to-support-the-app-router#when-should-you-use-client-components-vs-server-components)
 [Graphql code generator](https://graphql.wtf/episodes/67-the-new-graphql-code-generator-client-preset)

# [Types with node](https://typestrong.org/ts-node/)

# Repos

- [curso-nodejs-auth](https://github.com/platzi/curso-nodejs-auth/tree/13-step)
- [curso-nodejs-graphql](https://github.com/platzi/curso-nodejs-graphql/tree/step-1-init)
- [platzi-graphql-fullstack](https://github.com/jonalvarezz/platzi-graphql-fullstack/tree/main)

