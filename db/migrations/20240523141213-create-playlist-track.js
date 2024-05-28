'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Playlist_Tracks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      playlistId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Playlists',
          key: 'id',
        },
      },
      trackId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Tracks',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    await queryInterface.addConstraint('Playlist_Tracks', {
      fields: ['playlistId', 'trackId'],
      type: 'unique',
      name: 'unique_playlist_track_constraint'  // Optional name for the constraint
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Playlist_Tracks');
  }
};