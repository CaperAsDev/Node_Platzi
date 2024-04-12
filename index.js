import express from 'express'
import routerApi from './routes/index.js'
import cors from 'cors'
import { errorHandler, logError, boomErrorHandler, ormErrorHandler } from './middlewares/error.handler.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hola mundo')
})

routerApi(app)

app.use(logError)
app.use(boomErrorHandler) // Errores de validacion Joi
app.use(ormErrorHandler) // Errores de sequelize
app.use(errorHandler)

app.listen(port, ()=> {
  console.log(`Corriendo en http://localhost:${port}`);
})
