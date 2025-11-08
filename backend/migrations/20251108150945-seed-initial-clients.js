'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    // Verifica se já existem clientes na tabela
    const [existingClients] = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM clients'
    )
    
    const clientCount = existingClients[0].count
    
    // Verifica se já existem contatos na tabela
    const [existingContacts] = await queryInterface.sequelize.query(
      'SELECT COUNT(*) as count FROM contacts'
    )
    
    const contactCount = existingContacts[0].count
    
    // Se já existem dados em ambas as tabelas, não insere novamente
    if (clientCount > 0 && contactCount > 0) {
      console.log('Clientes e contatos já existem na base de dados. Pulando inserção.')
      return
    }

    const clients = []
    const contacts = []

    const start = new Date()
    start.setMonth(start.getMonth() - 12) // 12 meses atrás
    const end = new Date() // hoje

    // Função para gerar data aleatória entre start e end
    const randomDate = (start, end) => {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    }

    // Gera 50 clientes fictícios com datas aleatórias
    for (let i = 1; i <= 50; i++) {
      const createdAt = randomDate(start, end)
      clients.push({
        name: `Cliente ${i}`,
        email: `cliente${i}@email.com`,
        phone: `119${String(10000000 + i).slice(-8)}`,
        createdAt,
        updatedAt: createdAt,
      })
    }

    await queryInterface.bulkInsert('clients', clients)
    console.log('50 clientes inseridos com sucesso.')

    // Gera 200 contatos aleatórios vinculados a clientes
    for (let i = 1; i <= 200; i++) {
      const clientId = Math.floor(Math.random() * 50) + 1
      const createdAt = randomDate(start, end)
      contacts.push({
        name: `Contato ${i}`,
        email: `contato${i}@email.com`,
        phone: `119${String(20000000 + i).slice(-8)}`,
        clientId,
        createdAt,
        updatedAt: createdAt,
      })
    }

    await queryInterface.bulkInsert('contacts', contacts)
    console.log('200 contatos inseridos com sucesso.')
  },

  async down(queryInterface, Sequelize) {
    // Remove apenas os dados fictícios inseridos por esta migration
    await queryInterface.bulkDelete('contacts', {
      email: {
        [Sequelize.Op.like]: 'contato%@email.com'
      }
    }, {})
    
    await queryInterface.bulkDelete('clients', {
      email: {
        [Sequelize.Op.like]: 'cliente%@email.com'
      }
    }, {})
    
    console.log('Dados fictícios removidos com sucesso.')
  },
}