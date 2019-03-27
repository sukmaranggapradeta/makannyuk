'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
     
    */
   return queryInterface.bulkInsert('Food_Ingredients', [{
    FoodId: 1,
    IngredientId: 1,
    createdAt: new Date(),
    updatedAt:new Date()
  },{
    FoodId: 1,
    IngredientId: 2,
    createdAt: new Date(),
    updatedAt:new Date()
  },{
    FoodId: 1,
    IngredientId: 3,
    createdAt: new Date(),
    updatedAt:new Date()
  }, {
    FoodId: 2,
    IngredientId: 1,
    createdAt: new Date(),
    updatedAt:new Date()

  },{
    FoodId: 2,
    IngredientId: 3,
    createdAt: new Date(),
    updatedAt:new Date()

  }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Food_Ingredients', null, {});
  }
};
