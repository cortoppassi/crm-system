const sequelize = require('./index');
const Cliente = require('../models/Client');

(async () => {
  await sequelize.sync({ alter: true });
  console.log('Tabelas sincronizadas com SQLite 🗃️');
})();
