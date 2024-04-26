import { Sequelize } from "sequelize";
import { config } from "../config/config.js"
import setupModels from "../db/models/index.js";

let URI = ''

const options = {
  dialect: 'postgres',
  logging: !config.isProd,
}

if (config.isProd) {
  URI = config.dbUrl
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
} else {
  const USER = encodeURIComponent(config.dbUser)
  const PASSWORD = encodeURIComponent(config.dbPassword)

  URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`
}

export const sequelize = new Sequelize(URI, options)

setupModels(sequelize)

// await sequelize.sync({alter: true})
export const models = sequelize.models
