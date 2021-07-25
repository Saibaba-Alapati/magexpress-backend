const Sequelize = require('sequelize');
const db = require('../databaseInfo');
const User = db.define('person',{
  firstname: {
    type:Sequelize.STRING,
    allowNull:false,
  },
  lastname: {
    type:Sequelize.STRING,
    allowNull:false,
  },
  username:  {
    type:Sequelize.STRING,
    allowNull:false,
    unique:true
  },
  gender: {
    type:Sequelize.STRING,
    allowNull:false,
  },
  email: {
    type:Sequelize.STRING,
    allowNull:false,
  },
  password: {
    type:Sequelize.STRING,
    allowNull:false,
  }
});
module.exports = User;
