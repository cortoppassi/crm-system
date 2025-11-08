const express = require('express')
const cors = require('cors')
const { routesController } = require('./src/routes/routes.js')
const sequelize = require('./src/database')

require('./src/models/client.model.js')
require('./src/models/contact.model.js')
require('./src/models/user.model.js')

const authRoutes = require('./src/routes/auth.routes.js')

const app = express()

app.use(cors())
app.use(express.json())

routesController(app)

const PORT = 3000

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Banco SQLite sincronizado ✅')
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT} 🚀`)
    })
  })
  .catch(err => {
    console.error('Erro ao sincronizar banco:', err)
  })

module.exports = app
