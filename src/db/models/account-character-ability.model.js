import { Model, DataTypes } from "sequelize";
import { ACCOUNT_CHARACTER_TABLE } from "./account-character.model";
import { ABILITY_TABLE } from "./ability.model";
import { ELEMENTAL_TABLE } from "./elemental.model";

const ACCOUNT_CHARACTER_ABILITY_TABLE = "account_characters_abilities";

const AccountCharacterAbilitySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  AccountCharacterId: {
    field: 'account_character_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ACCOUNT_CHARACTER_TABLE,
      key: 'id'
    }
  },
  AbilityId: {
    field: 'ability_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ABILITY_TABLE,
      key: 'id'
    }
  },
  ElementalId: {
    field: 'elemental_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ELEMENTAL_TABLE,
      key: 'id'
    }
  },
  lvlAbility: {
    defaultValue: 0,
    type: DataTypes.INTEGER,
  },
  lvlElemental: {
    defaultValue: 0,
    type: DataTypes.INTEGER,
  }
}

class AccountCharacterAbility extends Model {
  static associate(models){
    // this.hasMany(models.Element, {as: 'element'})
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: ACCOUNT_CHARACTER_ABILITY_TABLE,
      modelName: 'AccountCharacterAbility',
      timestamps: false,
    }
  }
}

export { ACCOUNT_CHARACTER_ABILITY_TABLE, AccountCharacterAbilitySchema, AccountCharacterAbility }
