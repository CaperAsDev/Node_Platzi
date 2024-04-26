import { Model, DataTypes } from "sequelize";
import { hashPassword } from "../../../pass-hash";

const USER_TABLE = "users";

const UserSchema = {
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
  password: {
    allowNull: false,
    type: DataTypes.STRING,
    async set (value) {
      const password = await hashPassword(value)
      this.setDataValue('password', password)
    }
  },
  recoveryToken: {
    field:'recovery_token',
    allowNull: true,
    type: DataTypes.STRING,
    unique: true
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  }
}

class User extends Model {
  static associate(){
    // models
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: true,
      updatedAt: false,
    }
  }
}

export {USER_TABLE, UserSchema, User}
