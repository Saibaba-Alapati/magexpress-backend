const Sequelize = require('sequelize');
const db = require('../databaseInfo');
const Project = db.define('project',{
    creator_id: {
      type: Sequelize.INTEGER,
      references:{
        model:'person',
        key:'id'
      }
    },
    name: Sequelize.STRING,
    description: Sequelize.TEXT
});
module.exports = Project;