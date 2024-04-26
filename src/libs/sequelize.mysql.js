import { Sequelize } from "sequelize";
import { config } from "../config/config.js"
import setupModels from "../db/models/index.js";

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)

const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

export const sequelize = new Sequelize(URI, {
  dialect: 'mysql',
  logging: false
})

setupModels(sequelize)

await sequelize.sync({ alter: true });

export const models = sequelize.models
