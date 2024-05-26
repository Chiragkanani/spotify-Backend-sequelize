'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Playlist.belongsTo(models.User, { foreignKey: 'userId' })
      models.Playlist.belongsToMany(models.Track, { through: models.Playlist_Track });

    }
  }
  Playlist.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      validate: {
        isNumeric: {
          msg: "Enter UserId in numeric"
        },
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Enter Proper Value in name of playlist"
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    modelName: 'Playlist',
    timestamps:true,
    paranoid:true
  });
  return Playlist;
};