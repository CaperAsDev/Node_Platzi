import { User, UserSchema } from "./user.model.js";
import { Character, CharacterSchema } from "./character.model.js";
import { Ability, AbilitySchema } from "./ability.model.js";
import { Elemental, ElementalSchema } from "./elemental.model.js";
import { Account, AccountSchema } from "./account.model.js";
import { AccountCharacterAbility, AccountCharacterAbilitySchema } from "./account-character-ability.model.js";
import { AccountCharacter, AccountCharacterSchema } from "./account-character.model.js";
import { ElementalSynergy, ElementalSynergySchema } from "./elemental-synergy.model.js";

function setupModels(sequelize){
  // Base Tables
  User.init(UserSchema, User.config(sequelize))
  Character.init(CharacterSchema, Character.config(sequelize))
  Ability.init(AbilitySchema, Ability.config(sequelize))
  Elemental.init(ElementalSchema, Elemental.config(sequelize))
  Account.init(AccountSchema, Account.config(sequelize))
  // Association Tables
  AccountCharacterAbility.init(AccountCharacterAbilitySchema, AccountCharacterAbility.config(sequelize))
  AccountCharacter.init(AccountCharacterSchema, AccountCharacter.config(sequelize))
  ElementalSynergy.init(ElementalSynergySchema, ElementalSynergy.config(sequelize))

  // Associations
  User.associate(sequelize.models)
  Ability.associate(sequelize.models)
  Elemental.associate(sequelize.models)
  Account.associate(sequelize.models)
  Character.associate(sequelize.models)
}

export default setupModels
