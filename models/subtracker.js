const Sequelize = require('sequelize');
const db = require('../databaseInfo');
const SubTracker = db.define('subtracker',{
  parenttracker_id: {
    type:Sequelize.INTEGER,
    references:{
      model:'tracker',
      key:'id',
    }
  },
  childtracker_id: {
    type:Sequelize.INTEGER,
    references:{
      model:'tracker',
      key:'id',
    }
  }
});
module.exports = SubTracker;