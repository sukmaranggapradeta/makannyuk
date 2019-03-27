'use strict';
var faker = require('faker');
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
   return queryInterface.bulkInsert('Users', [{
   first_name: faker.name.firstName(),
   last_name: faker.name.lastName(),
   gender: 'male',
   email: faker.internet.email(),
   user_name: faker.internet.userName(),
   password: faker.internet.password(),
   createdAt: new Date(),
   updatedAt: new Date()
  },
{
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  gender: 'female',
  email: faker.internet.email(),
  user_name: faker.internet.userName(),
  password: faker.internet.password(),
  createdAt: new Date(),
  updatedAt: new Date()
},{
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  gender: 'male',
  email: faker.internet.email(),
  user_name: faker.internet.userName(),
  password: faker.internet.password(),
  createdAt: new Date(),
  updatedAt: new Date()
},{
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  gender: 'female',
  email: faker.internet.email(),
  user_name: faker.internet.userName(),
  password: faker.internet.password(),
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
   return queryInterface.bulkDelete('Users', null, {});
  }
};
