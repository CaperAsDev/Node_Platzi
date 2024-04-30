import { getCharacter, getCharacters, addCharacter, updateCharacter, getElementalByCharacter } from "./character.resolver.js"
import { login } from "./auth.resolver.js"
import { RegularExpression } from "graphql-scalars"

const CharacterNameType = new RegularExpression('CategoryNameType', /^[a-zA-Z0-9]{3,10}$/);

const resolvers = {
  Query: {
    character: getCharacter,
    characters: getCharacters
  },
  Mutation: {
    addCharacter,
    updateCharacter,
    login
  },
  CharacterNameType,
  Character: {
    elemental: getElementalByCharacter
  }
}

export default resolvers
