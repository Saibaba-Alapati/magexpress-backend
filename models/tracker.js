const Sequelize = require('sequelize');
const db = require('../databaseInfo');
const Tracker = db.define('tracker',{
  creator_id: {
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
  },
  categorycontainer_id: {
    type:Sequelize.INTEGER,
    references:{
    model:'categorycontainer',
    key:'id',
    }
  },
  projectid: {
    type:Sequelize.INTEGER,
    references:{
    model:'project',
    key:'id',
    }
  },
  name: Sequelize.STRING,
  content: Sequelize.STRING,
  startdate: Sequelize.DATE,
  enddate: Sequelize.DATE
});
module.exports = Tracker;