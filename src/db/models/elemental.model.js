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
  },
  counterBy: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  counterFor: {
    allowNull: false,
    type: DataTypes.STRING,
  }
}

class Elemental extends Model {
  static associate(models){
    // this.belongsTo(models.User, {as: 'user'})
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
