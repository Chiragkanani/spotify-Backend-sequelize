'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Album.hasMany(models.Album_Artist, { foreignKey: 'albumId' });
      models.Album.hasMany(models.Album_Track, { foreignKey: 'albumId' });
      models.Album.belongsToMany(models.Artist, { through: models.Album_Artist });
      models.Album.belongsToMany(models.Track, { through: models.Album_Track });
    }
    static initScope(models) {
      this.addScope('withTracks', {
        include: [
          {
            model: models.Artist,
            through: {
              attributes: []
            }
          },
          {
            model: models.Track,
            through: {
              attributes: []
            },
            include: [{
              model: models.Artist,
              through: {
                attributes: []
              }
            }]
          }
        ]
      });
    }
  }
  Album.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        notEmpty: {
          msg: "Enter Proper Value in Title"
        }
      }
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: "Enter Proper Date value"
        }
      }
    },
    genre: {
      type: DataTypes.STRING(45)
    },
  }, {
    sequelize,
    modelName: 'Album',
    paranoid:true,
    timestamps:true,
  });
  return Album;
};