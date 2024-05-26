'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Users',
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
      deletedAt:{
        type:Sequelize.DATE,
        defaultValue:null
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
    await queryInterface.addConstraint('User_Likes', {
      fields: ['userId', 'trackId'],
      type: 'unique',
      name: 'unique_user_track_constraint'  // Optional name for the constraint
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User_Likes');
  }
};