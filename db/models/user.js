'use strict';
const generate_unique_id = require('generate-unique-id');
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.hasMany(models.Playlist, { foreignKey: 'userId' });
      models.User.belongsToMany(models.Track, { through: models.User_Like });
      models.User.belongsToMany(models.Artist, { through: models.User_Follow ,as:"Followers"});
    }
  }
  User.init({
    firstName:{
      type: DataTypes.STRING(45),
      allowNull: false,
      validate:{
        notEmpty:{
          msg:"Enter Proper Value in FirstName"
        }
      }
    } ,
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Enter Proper Value in lastName"
        }
      }
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique:true,
      validate:{
      isEmail:{
        msg:"Enter email in right format"
      }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len:{
          args:[6,12],
          msg:"Enter Password Length Between 6 to 12"
        },
        notEmpty: {
          msg: "Enter Proper Value in password"
        }
      }
    },
    salt: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    active_pin: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      },
    },
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeValidate:(user,options)=>{
        user.salt = generate_unique_id({length:4});
        user.active_pin = generate_unique_id({length:12});
      },
      beforeCreate:async(user,options)=>{
        user.password = await bcrypt.hash(user.password + user.salt, 10);
      }
    }
  });
  return User;
};