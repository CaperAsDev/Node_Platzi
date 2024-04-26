import { Model, DataTypes } from "sequelize";
import { ELEMENTAL_TABLE } from "./elemental.model";

const ELEMENTAL_SYNERGY_TABLE = "elementals_synergy";

const ElementalSynergySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
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
  counterBy: {
    field: 'counter_by_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ELEMENTAL_TABLE,
      key: 'id'
    }
  },
  counterFor: {
    field: 'counter_for_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ELEMENTAL_TABLE,
      key: 'id'
    }
  }
}

class ElementalSynergy extends Model {
  static associate(models){
    // this.belongsTo(models.User, {as: 'user'})
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: ELEMENTAL_SYNERGY_TABLE,
      modelName: 'ElementalSynergy',
      timestamps: false,
    }
  }
}

export {ELEMENTAL_SYNERGY_TABLE, ElementalSynergySchema, ElementalSynergy}
