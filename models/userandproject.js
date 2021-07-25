const Sequelize = require('sequelize');
const db = require('../databaseInfo');
const UserandProject = db.define('userandproject',{
  user_id: {
    type:Sequelize.INTEGER,
    references:{
      model:'user',
      key:'id',
    }
  },
  project_id: {
    type:Sequelize.INTEGER,
    references:{
      model:'project',
      key:'id',
    }
  }
});
module.exports = UserandProject;

