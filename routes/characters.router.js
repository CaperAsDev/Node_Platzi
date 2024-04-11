import express from 'express'
import CharacterService from '../services/characters.service.js'

const router = express.Router()
const service = new CharacterService();

router.get('/', (req, res, next)=>{
  try {
    const characters = service.findAll()
    res.json(characters)

  } catch (error) {
    next(error)
  }
})

router.get('/:id', (req, res, next)=>{
  const { id } = req.params

  try {
    const characters = service.findOne({id})
    res.json(characters)

  } catch (error) {
    next(error)
  }
})

router.post('/', (req, res)=>{
  const data = req.body
  res.status(201).json(
    {
      created: true,
      data
    }
  )
})
export default router
