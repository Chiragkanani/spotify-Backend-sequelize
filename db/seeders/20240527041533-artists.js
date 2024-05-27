'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Artists', [{
        firstName: "atif",
        lastName: "aslum",
        bio: "i am fan arijit",
        createdAt:new Date(),
        updatedAt:new Date()
    },{
      firstName: "arijit",
      lastName: "singh",
      bio: "i am from mumbai",
      createdAt:new Date(),
      updatedAt:new Date()
  },], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
