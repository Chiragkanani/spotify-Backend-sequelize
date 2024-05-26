'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('User_Follows', {
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
          model: "Users",
          key: 'id',
        },
      },
      artistId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Artists',
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
    await queryInterface.addConstraint('User_Follows', {
      fields: ['userId', 'artistId'],
      type: 'unique',
      name: 'unique_user_follow_constraint'  // Optional name for the constraint
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('User_Follows');
  }
};