import express from 'express'
import CharacterService from '../services/characters.service.js'
import validatorHandler from '../middlewares/validator.handler.js';
import { createCharacterSchema, getCharacterSchema } from '../dtos/character.dto.js';
import passport from 'passport';
import { checkRoles } from '../middlewares/auth.handler.js';

const router = express.Router()
const service = new CharacterService();

router.get('/', async (req, res, next)=>{
  try {
    const characters = await service.findAll()
    res.json(characters)

  } catch (error) {
    next(error)
  }
})

router.get('/:id',
  validatorHandler(getCharacterSchema, 'params'),
  async (req, res, next)=>{
    const { id } = req.params

    try {
      const character = await service.findOne({id})
      res.json(character)

    } catch (error) {
      next(error)
    }
})

router.post('/',
  passport.authenticate('jwt',{session: false}),
  checkRoles(['admin']),
  validatorHandler(createCharacterSchema, 'body'),
  async (req, res, next)=>{
    const data = req.body
    console.log('DATA Router: ', data);
    try {
      const newCharacter =  await service.create(data)
      res.status(201).json(newCharacter)

    } catch (error) {
      next(error)
    }
  }
)
export default router
