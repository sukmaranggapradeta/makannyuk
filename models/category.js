'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category_name: DataTypes.STRING,
    description_category: DataTypes.TEXT
  }, {});
  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.Food, {foreignKey: 'CategoryId'})
  };
  return Category;
};