import { Model, DataTypes } from "sequelize";
import { CHARACTER_TABLE } from "./character.model.js";
import { ACCOUNT_TABLE } from "./account.model.js";

const ACCOUNT_CHARACTER_TABLE = "account_characters";

const AccountCharacterSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  AccountId: {
    field: 'account_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ACCOUNT_TABLE,
      key: 'id'
    }
  },
  CharacterId: {
    field: 'character_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CHARACTER_TABLE,
      key: 'id'
    }
  },
  name: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: true
  }
}

class AccountCharacter extends Model {
  static associate(models){
    this.belongsToMany(models.Ability, {
      through: models.AccountCharacterAbility,
      as: 'abilities',
      foreignKey: 'AccountCharacterId'
    })

    // this.hasMany(models.Element, {as: 'element'})
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: ACCOUNT_CHARACTER_TABLE,
      modelName: 'AccountCharacter',
      timestamps: true,
    }
  }
}

export { ACCOUNT_CHARACTER_TABLE, AccountCharacterSchema, AccountCharacter }
