'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Artist.belongsToMany(models.Track, { through: models.Track_Artist });
      models.Artist.hasMany(models.User_Follow, { foreignKey: 'artistId' });
      models.Artist.belongsToMany(models.Album, { through: models.Album_Artist });
      models.Artist.belongsToMany(models.User, { through: models.User_Follow ,as:"Followers"});
    }
  }
  Artist.init({
    firstName: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: "Enter Proper Value in firstName"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: "Enter Proper Value in lastName"
        }
      }
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        notEmpty: {
          msg: "Enter Proper Value in Bio"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Artist',
    paranoid:true,
    timestamps:true
  });
  return Artist;
};