'use strict';

const { sequelize } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    try {
      await queryInterface.addColumn(
        'Bookings',
        'noOfSeats',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          defaultValue:1
          
        }
  
      );
      await queryInterface.addColumn(
        'Bookings',
        'totalCost',
        {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          defaultValue:0
        }
      )
    } catch (error) {
      throw error
    }
    
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    try {
      await queryInterface.removeColumn('Bookings', 'noOfSeats'); 
      await queryInterface.removeColumn('Bookings','totalCost'); 

    } catch (error) {
      throw error
    }
  }
};
