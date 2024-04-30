import { Model, DataTypes } from "sequelize";
import  bcrypt from 'bcrypt';

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
      const hash = await bcrypt.hash(value, 10);
      this.setDataValue('password', hash)
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
  static associate(models){
    this.hasMany(models.Account, {
      as: 'account',
      foreignKey: 'UserId'
    })
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
