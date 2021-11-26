const Sequelize = require('sequelize');
const sequelize = new Sequelize('trainingdb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;