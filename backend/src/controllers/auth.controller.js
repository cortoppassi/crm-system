const AuthService = require('../services/auth.service')

module.exports = {
  async register(req, res) {
    try {
      const { email, password } = req.body
      const result = await AuthService.register(email, password)
      res.status(201).json(result)
    } catch (error) {
      console.error('Erro ao registrar:', error.message)
      res.status(400).json({ message: error.message })
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body
      const result = await AuthService.login(email, password)
      res.status(200).json(result)
    } catch (error) {
      console.error('Erro ao logar:', error.message)
      res.status(400).json({ message: error.message })
    }
  },
}
