import CharacterService from "../../services/characters.service.js"
import checkJwtGql from "../../authUtils/Gql/checkJwtGql.js"
import checkRolesGql from "../../authUtils/Gql/checkRolGql.js"

const service = new CharacterService()
/*
Resolvers can return a promise, Graphql will manage the promises for us.
As i'ts not a problem to return promises, I will skip using async functions where it's not necessary
*/

export const getCharacter = (_, {id}) => {
  return service.findOne({id});
}

export const getCharacters = () => {
  return service.findAll()
}

export const addCharacter = async (_, {dto}, context) => {
  const  user  = await checkJwtGql(context)
  checkRolesGql(user, ['admin'])
  return service.create(dto)
}

export const updateCharacter = (_, {id, dto}) => {
  return service.update(id, dto)
}

export const deleteharacter = async (_, {id}) => {
  await service.delete(id)
  return id
}

export const getElementalByCharacter = async (parent) => {
  console.log(parent);
  return {name: 'fuego', id: 2, description:'balbala'}
}
