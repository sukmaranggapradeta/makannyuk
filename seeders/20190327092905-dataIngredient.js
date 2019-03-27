'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      
    */
   return queryInterface.bulkInsert('Ingredients', [{
    ingredient_name: 'telor',
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    ingredient_name: 'ayam',
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    ingredient_name: 'susu',
    createdAt: new Date(),
    updatedAt: new Date()
  },{
    ingredient_name: 'cabe',
    createdAt: new Date(),
    updatedAt: new Date()

  }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      
    */
   return queryInterface.bulkDelete('Ingredients', null, {});
  }
};
