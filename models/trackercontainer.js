const Sequelize = require('sequelize');
const db = require('../databaseInfo');
const TrackerContainer = db.define('trackercontainer',{
  creator_id: {
    type:Sequelize.INTEGER,
    references:{
      model:'person',
      key:'id'
    }
  },
  name: Sequelize.STRING,
  description: Sequelize.TEXT,
  project_id:{ 
    type: Sequelize.INTEGER,
    references:{
      model:'project',
      key:'id'
    }
  }
});
module.exports = TrackerContainer;
