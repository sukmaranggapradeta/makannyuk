'use strict';
const crypto = require('crypto');  
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: DataTypes.STRING,
    user_name: DataTypes.STRING,
    password:DataTypes.STRING
  }, {hooks:{
    beforeCreate: function(user, option){
      let secret= 'abcdef'
      const hash = crypto.createHmac('sha256',secret).update(user.password).digest('hex')
      user.password = hash
      
    }
  }});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Food, {foreignKey: 'UserId'})
  };
  return User;
};