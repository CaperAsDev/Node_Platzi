import charactersRouter from "./characters.router.js";
import AuthRouter from './auth.router.js'

import {Router} from 'express'

function routerApiV1(app){
  const router = Router()
  app.use('/api/v1', router)
  router.use('/characters', charactersRouter)
  router.use('/auth', AuthRouter)
}

export default routerApiV1
