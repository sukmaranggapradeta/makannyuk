'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    user_name: DataTypes.STRING,
    password: {
      type : DataTypes.STRING,
      validate :{
        isEmail :true
      }
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};