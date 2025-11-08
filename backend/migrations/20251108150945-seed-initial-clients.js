'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    const clients = []
    const contacts = []
    const now = new Date()

    // Gera 50 clientes fictícios
    for (let i = 1; i <= 50; i++) {
      clients.push({
        name: `Cliente ${i}`,
        email: `cliente${i}@email.com`,
        phone: `119${String(10000000 + i).slice(-8)}`,
        createdAt: now,
        updatedAt: now,
      })
    }

    // Insere clientes
    await queryInterface.bulkInsert('clients', clients)

    // Gera 200 contatos aleatórios vinculados a clientes
    for (let i = 1; i <= 200; i++) {
      const clientId = Math.floor(Math.random() * 50) + 1
      contacts.push({
        name: `Contato ${i}`,
        email: `contato${i}@email.com`,
        phone: `119${String(20000000 + i).slice(-8)}`,
        clientId,
        createdAt: now,
        updatedAt: now,
      })
    }

    // Insere contatos
    await queryInterface.bulkInsert('contacts', contacts)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('contacts', null, {})
    await queryInterface.bulkDelete('clients', null, {})
  },
}
