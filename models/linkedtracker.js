const Sequelize = require('sequelize');
const db = require('../databaseInfo');
const LinkedTracker = db.define('linkedtracker',{
  tracker_id1: {
    type:Sequelize.INTEGER,
    references:{
      model:'tracker',
      key:'id',
    }
  },
  tracker_id2: {
    type:Sequelize.INTEGER,
    references:{
      model:'tracker',
      key:'id',
    }
  }
});
module.exports = LinkedTracker;