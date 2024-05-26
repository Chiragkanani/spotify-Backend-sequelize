'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album_Track extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Album_Track.belongsTo(models.Album, {
        foreignKey: 'albumId', onDelete: 'CASCADE',
        onUpdate: 'CASCADE' })
    }
  }
  Album_Track.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    albumId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'albums',
        key: 'id',
      },
    },
    trackId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tracks',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Album_Track',
    timestamps:true
  });
  return Album_Track;
};