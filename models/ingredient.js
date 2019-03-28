'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define('Ingredient', {
    ingredient_name: DataTypes.STRING
  }, {});
  Ingredient.associate = function(models) {
    // associations can be defined here
    Ingredient.belongsToMany(models.Food, {through: 'Food_Ingredient', foreignKey:'IngredientId'})

  };
  return Ingredient;
};