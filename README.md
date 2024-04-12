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
