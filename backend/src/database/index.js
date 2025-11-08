const { Sequelize } = require('sequelize');
const dbConfig = require('../config/database');

const sequelize = new Sequelize(dbConfig);

sequelize.authenticate()
  .then(() => console.log('Conectado ao SQLite ✅'))
  .catch(err => console.error('Erro ao conectar ao banco:', err));

module.exports = sequelize;
