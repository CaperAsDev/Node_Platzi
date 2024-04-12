import pkg from "pg"
import { config } from "../config/config.js"

const { Pool } = pkg

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)

const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`
const client = new Pool({ connectionString: URI })
/* const { Client } = pkg
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'caper',
  password: 'admin123',
  database: 'my_characters'
})

await client.connect()
 */


/*
const client = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'caper',
  password: 'admin123',
  database: 'my_characters'
}) */

export default client
