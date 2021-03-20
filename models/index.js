const dbConfig = require('../config/db.config')
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect:dbConfig.dialect,
    }
)

const db ={}

db.sequelize = sequelize
db.Sequelize= Sequelize

db.users=  require('./users.model.js')(sequelize,Sequelize);
db.tokens=  require('./tokens.model.js')(sequelize,Sequelize);

db.users.associate(db)
db.tokens.associate(db)


module.exports = db;
