const Sequelize = require('sequelize');
const db = require('../databaseInfo');
const CategoryContainer = db.define('categorycontainer',{
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
  project_id: {
    type:Sequelize.INTEGER,
    references:{
      model:'project',
      key:'id',
    }
  },
  name: Sequelize.STRING,
  description: Sequelize.TEXT
});
module.exports = CategoryContainer;