import { User, UserSchema } from "./user.model.js";
import { Character, CharacterSchema } from "./character.model.js";

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize))
  Character.init(CharacterSchema, Character.config(sequelize))
}

export default setupModels
