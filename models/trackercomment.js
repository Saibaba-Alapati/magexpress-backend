const Sequelize = require('sequelize');
const db = require('../databaseInfo');
const TrackerComment = db.define('trackercomment',{
  creator_id: {
      type:Sequelize.INTEGER,
      references:{
        model:'user',
        key:'id',
      }
    },
    trackercontainer_id: {
      type:Sequelize.INTEGER,
      references:{
        model:'trackercontainer',
        key:'id',
      }
    },
    categorycontainer_id: {
      type:Sequelize.INTEGER,
      references:{
        model:'categorycontainer',
        key:'id',
      }
    },
    tracker_id: {
      type:Sequelize.INTEGER,
      references:{
        model:'tracker',
        key:'id',
      }
    },
    project_id: {
      type:Sequelize.INTEGER,
      references:{
        model:'project',
        key:'id',
      }
    },
    content: Sequelize.TEXT
});
module.exports = TrackerComment;