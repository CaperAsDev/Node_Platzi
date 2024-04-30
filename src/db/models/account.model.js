import { Model, DataTypes } from "sequelize";
import { ELEMENTAL_TABLE } from "./elemental.model.js";
import { USER_TABLE } from "./user.model.js";

const ACCOUNT_TABLE = "accounts";

const AccountSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  ElementalId: {
    field: 'elemental_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ELEMENTAL_TABLE,
      key: 'id'
    },
  },
  UserId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
  }
}

class Account extends Model {
  static associate(models){
    this.belongsTo(models.User)
    this.belongsToMany(models.Character, {through: models.AccountCharacter})
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: ACCOUNT_TABLE,
      modelName: 'Account',
      timestamps: true,
    }
  }
}

export {ACCOUNT_TABLE, AccountSchema, Account}
