import { Model, DataTypes } from "sequelize";

const ABILITY_TABLE = "abilities";

const AbilitySchema = {
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
  type: {
    allowNull: true,
    type: DataTypes.STRING,
    unique: true
  },
  attack: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  defense: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  description: {
    allowNull: true,
    type: DataTypes.STRING,
  }
}

class Ability extends Model {
  static associate(models){
    this.belongsToMany(models.AccountCharacter, {
      through: models.AccountCharacterAbility,
      foreignKey: 'AbilityId'
    })
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: ABILITY_TABLE,
      modelName: 'Ability',
      timestamps: false,
    }
  }
}

export {ABILITY_TABLE, AbilitySchema, Ability}
