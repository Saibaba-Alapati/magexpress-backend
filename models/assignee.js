const Sequelize = require('sequelize');
const db = require('../databaseInfo');
const Assignee = db.define('assignee',{
    assignee_id: {
      type: Sequelize.INTEGER,
      references:{
        model:'person',
        key:'id'
      }
    },
    tracker_id: {
      type: Sequelize.INTEGER,
      references:{
        model:'tracker',
        key:'id'
      }
    }
});
module.exports = Assignee;