import express from 'express'
import cors from 'cors'

import routerApi from './routes/index.js'
import { useGraphql } from './graphql/index.js'
import { errorHandler, logError, boomErrorHandler, ormErrorHandler } from './middlewares/error.handler.js'
import { checkApiKey } from './middlewares/auth.handler.js'

import './authUtils/strategies/index.js'

const createApp = async () => {

  const app = express()
  app.use(express.json())
  app.use(cors())
  app.get('/', (req, res) => {
    res.send('Hola mundo')
  })

  app.get('/nueva-ruta', checkApiKey, (req, res) => {
    res.send('Hola, soy una nueva ruta');
  });

  routerApi(app)
  await useGraphql(app)

  app.use(logError)
  app.use(boomErrorHandler) // Errores de validacion Joi
  app.use(ormErrorHandler) // Errores de sequelize
  app.use(errorHandler)

  return app
}

export default createApp
