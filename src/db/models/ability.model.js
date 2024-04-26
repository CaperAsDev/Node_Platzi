import { Model, DataTypes } from "sequelize";
import { ELEMENTAL_TABLE } from "./elemental.model";

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
    this.hasMany(models.Element, {as: 'element'})
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
