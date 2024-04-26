import { config as env } from "../config/config.js"

const USER = encodeURIComponent(env.dbUser)
const PASSWORD = encodeURIComponent(env.dbPassword)

const URI = `postgres://${USER}:${PASSWORD}@${env.dbHost}:${env.dbPort}/${env.dbName}`

export default {
  development: {
    url: URI,
    dialect: 'postgres'
  },
  production: {
    url: URI,
    dialect: 'postgres'
  }
}
