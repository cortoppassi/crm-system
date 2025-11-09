const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserRepository = require('../repositories/user.repository')

const JWT_SECRET = process.env.JWT_SECRET || 'secret123'

module.exports = {
    async register(email, password) {
        const existing = await UserRepository.findByEmail(email)
        if (existing) throw new Error('E-mail já cadastrado.')

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await UserRepository.create({ email, password: hashedPassword })

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' })
        return { user, token }
    },

    async login(email, password) {
        const user = await UserRepository.findByEmail(email)
        if (!user) throw new Error('Usuário não encontrado.')

        const valid = await bcrypt.compare(password, user.password)
        if (!valid) throw new Error('Senha incorreta.')

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' })

        const safeUser = {
            email: user.email
        };

        return { user: safeUser, token }
    },
}
