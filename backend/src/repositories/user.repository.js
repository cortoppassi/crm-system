const User = require('../models/user.model')

module.exports = {
  async findByEmail(email) {
    try {
      return await User.findOne({ where: { email } })
    } catch (err) {
      console.error('Erro no findByEmail:', err)
      throw err
    }
  },

  async create(data) {
    try {
      return await User.create(data)
    } catch (err) {
      console.error('Erro no create:', err)
      throw err
    }
  },
}
