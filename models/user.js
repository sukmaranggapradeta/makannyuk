'use strict';
const crypto = require('crypto');  
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    gender: DataTypes.STRING,
    email: {type: DataTypes.STRING,
      validate: {
        isEmail:{
          args: true,
          msg:'format email harus benar'
        }
      }},
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

  User.cekEmail = function(input) {
    return User.findAll()
    .then(function(data){
      for (let i = 0; i < data.length; i++) {
        if(data[i].dataValues.email === input){
          return true
        }
         
      }
      return false


    })
  }

  return User;
};