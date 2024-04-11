import charactersRouter from "./characters.router.js";
import {Router} from 'express'

function routerApiV1(app){
  const router = Router()
  app.use('/api/v1', router)
  router.use('/characters', charactersRouter)
}

export default routerApiV1
