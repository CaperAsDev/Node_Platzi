import { Model, DataTypes } from "sequelize";

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
}

class Character extends Model {
  static associate(){
    // models
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
