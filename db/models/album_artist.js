'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album_Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Album_Artist.belongsTo(models.Album, {
        foreignKey: 'albumId', onDelete: 'CASCADE',
        onUpdate: 'CASCADE' })
    }
  }
  Album_Artist.init({
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
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'artists',
        key: 'id',
      },
    },

  }, {
    sequelize,
    modelName: 'Album_Artist',
    timestamps:true
  });
  return Album_Artist;
};