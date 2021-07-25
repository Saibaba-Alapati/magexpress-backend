const Sequelize = require('sequelize');
const db = require('../databaseInfo');
const UserandTrackerContainer = db.define('userandtrackercontainer',{
  user_id: {
    type:Sequelize.INTEGER,
    references:{
      model:'person',
      key:'id',
    }
  },
  trackercontainer_id: {
    type:Sequelize.INTEGER,
    references:{
      model:'trackercontainer',
      key:'id',
    }
  }
});
module.exports = UserandTrackerContainer;