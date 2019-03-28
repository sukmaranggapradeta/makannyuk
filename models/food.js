'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define('Food', {
    food_name: DataTypes.STRING,
    picture: DataTypes.STRING,
    description: DataTypes.TEXT,
    UserId: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER
  }, {});
  Food.associate = function(models) {
    // associations can be defined here
    Food.belongsToMany(models.Ingredient, {through:'Food_Ingredient', foreignKey:'FoodId'})
  };
  return Food;
};