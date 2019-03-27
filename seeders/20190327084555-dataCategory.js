'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Categories', [{
   category_name:'Japan Food',
   description_category: `Makanan yang berasal dari negri sakura ini 
   dimasak dengan bahan utama yang berasal dari jepang, makanan khas jepang sering disebut nihonshoku atau washoku.`,
   createdAt: new Date(),
   updatedAt: new Date()
  },{
    category_name:'Indonesian Food',
   description_category: `Makanan yang berasal dari indonesia ini memiliki ciri khas bumbu yang kuat dimana 
   disetiap daerah di Indonesia memiliki makanan dengan signature nya masing-masing.`,
   createdAt: new Date(),
   updatedAt: new Date()

  },{
    category_name:'Western Food',
    description_category: `Makanan khas barat memiliki beberapa kepraktisan yaitu dari segi penyajian dan bumbu yang 
    membuat makanan barat memiliki ciri khas tersendiri dibandingkan makanan belahan dunia.`,
    createdAt: new Date(),
    updatedAt: new Date()

  }, {
    category_name:'Chinese Food',
    description_category: `Makanan khas dari negri tirai bambu selalu memliki bumbu rahasia dan menanamkan filosofi disetiap 
    makanannya, yang membuat chinese food tak kalah lezat dari makanan dari belahan dunia yang lain.`,
    createdAt: new Date(),
    updatedAt: new Date()

  }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Categories', null, {});
  }
};
