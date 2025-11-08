const express = require('express');
const cors = require('cors');
const { routesController } = require('./src/routes/routes.js');
const sequelize = require('./src/database'); // importa a conexão
require('./src/models/client.model.js');
require('./src/models/contact.model.js');

const app = express();

app.use(cors());
app.use(express.json());
routesController(app);

const PORT = 3000;

// Sincroniza o SQLite e depois inicia o servidor
sequelize.sync({ alter: true }) // alter:true atualiza tabela se houver mudanças no model
  .then(() => {
    console.log('Banco SQLite sincronizado ✅');
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT} 🚀`);
    });
  })
  .catch(err => {
    console.error('Erro ao sincronizar banco:', err);
  });

module.exports = app;
