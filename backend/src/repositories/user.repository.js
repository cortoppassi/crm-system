const User = require('../models/user.model')

module.exports = {
  async findByEmail(email) {
    return await User.findOne({ where: { email } })
  },

  async create(data) {
    return await User.create(data)
  },
}
