'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Track.hasMany(models.Track_Artist, { foreignKey: 'trackId' })
      models.Track.hasMany(models.User_Like, { foreignKey: 'trackId' })
      models.Track.belongsToMany(models.Artist,{through:models.Track_Artist});
      models.Track.belongsToMany(models.Album, { through: models.Album_Track });
      models.Track.belongsToMany(models.Playlist, { through: models.Playlist_Track });
      models.Track.belongsToMany(models.User, { through: models.User_Like });

    }
  }
  Track.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: "Enter Proper Value in Title"
        }
      }
    },
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Enter Proper Value in path"
        }
      }
    },
    duration: {
      type: DataTypes.INTEGER, // Duration in seconds
      allowNull: false,
      validate: {
        isNumeric: {
          msg: "Enter duration in seconds"
        },
        max:900
      },
      get(){
        const minutes = Math.floor(this.getDataValue('duration') / 60);
        const seconds = this.getDataValue('duration') % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0') }`
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
  }, {
    sequelize,
    modelName: 'Track',
    timestamps:true,
    paranoid:true,
    scopes:{
      withLikeCount:{
        attributes: {
          include: [[
            sequelize.fn('COUNT', sequelize.col('User_Likes.trackId')),
            'likesCount'
          ]]
        },
      }
    }
  });
  return Track;
};