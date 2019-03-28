'use strict';
module.exports = (sequelize, DataTypes) => {
  const Food_Ingredient = sequelize.define('Food_Ingredient', {
    FoodId: DataTypes.INTEGER,
    IngredientId: DataTypes.INTEGER
  }, {});
  Food_Ingredient.associate = function(models) {
    // associations can be defined here
    Food_Ingredient.belongsTo(models.Food, {foreignKey:'FoodId'})
    Food_Ingredient.belongsTo(models.Ingredient,{foreignKey:'IngredientId'})
  };
  return Food_Ingredient;
};