import { Model, DataTypes } from "sequelize";

const ELEMENTAL_TABLE = "elementals";

const ElementalSchema = {
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
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  }
}

class Elemental extends Model {
  static associate(models){
    this.hasMany(models.Character, {foreignKey: 'ElementalId'})
    this.hasMany(models.AccountCharacterAbility, {foreignKey: 'ElementalId'})

    this.hasOne(models.ElementalSynergy,{
      as: 'CounterFor',
      foreignKey:'counterFor'
    })
    this.hasOne(models.ElementalSynergy,{
      as: 'ElementalId',
      foreignKey:'ElementalId'
    })
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: ELEMENTAL_TABLE,
      modelName: 'Elemental',
      timestamps: false,
    }
  }
}

export {ELEMENTAL_TABLE, ElementalSchema, Elemental}
