import Joi from 'joi'

const id = Joi.number()
const name = Joi.string().min(3).max(15)
const favoriteColor = Joi.string().min(3).max(15)
const age = Joi.number()
const nickname = Joi.string().min(2).max(10)
const race = Joi.string().min(2).max(10)

const createCharacterSchema = Joi.object({
  name: name.required(),
  age: age.required(),
  nickname: nickname.required(),
  favoriteColor,
  race
})

const getCharacterSchema = Joi.object({
  id: id.required()
})

const updateCharacterSchema = Joi.object({
  name,
  age,
  nickname,
  favoriteColor
})

export {
  createCharacterSchema,
  updateCharacterSchema,
  getCharacterSchema
}
