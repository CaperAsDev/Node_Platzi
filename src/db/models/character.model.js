import { Model, DataTypes } from "sequelize";
import { ELEMENTAL_TABLE } from "./elemental.model.js";


const CHARACTER_TABLE = "characters";

const CharacterSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  age: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  nickname: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: true
  },
  favoriteColor: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  race: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  favoriteFood: {
    allowNull: true,
    type: DataTypes.STRING,
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
  type: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: true
  }
}

class Character extends Model {
  static associate(models){
    this.belongsTo(models.Elemental)
    this.belongsToMany(models.Account, {through: models.AccountCharacter})
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: CHARACTER_TABLE,
      modelName: 'Character',
      timestamps: false,
    }
  }
}

export {CHARACTER_TABLE, CharacterSchema, Character}
