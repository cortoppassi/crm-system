module.exports = {
  dialect: 'sqlite',
  storage: './src/database/database.sqlite',
  logging: false,
   dialectOptions: {
    timeout: 60000 
  },
}
