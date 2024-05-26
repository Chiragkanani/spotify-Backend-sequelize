'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Track_Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Track_Artist.belongsTo(models.Track, { foreignKey :'trackId'})
    }
  }
  Track_Artist.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    trackId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tracks',
        key: 'id',
      },
      validate:{
        isNumeric:true
      }
    },
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'artists',
        key: 'id',
      },
      validate: {
        isNumeric: true
      }
    },

  }, {
    sequelize,
    modelName: 'Track_Artist',
    timestamps:true
  });
  return Track_Artist;
};