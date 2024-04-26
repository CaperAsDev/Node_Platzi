import express from 'express'
import routerApi from './routes/index.js'
import cors from 'cors'
import { errorHandler, logError, boomErrorHandler, ormErrorHandler } from './middlewares/error.handler.js'
import { checkApiKey } from './middlewares/auth.handler.js'
import './utils/auth/index.js'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.get('/nueva-ruta', checkApiKey, (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app)

app.use(logError)
app.use(boomErrorHandler) // Errores de validacion Joi
app.use(ormErrorHandler) // Errores de sequelize
app.use(errorHandler)

app.listen(port, ()=> {
  console.log(`Corriendo en http://localhost:${port}`);
})
