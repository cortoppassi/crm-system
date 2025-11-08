const clientRepo = require('../repositories/client.repository.js');

module.exports = {
  createClient: async (data) => {
    return await clientRepo.create(data);
  },

  getAllClients: async () => {
    return await clientRepo.findAll();
  },

  getClientById: async (id) => {
    const client = await clientRepo.findById(id);
    if (!client) throw new Error('Cliente não encontrado');
    return client;
  },

  updateClient: async (id, data) => {
    const [rows, updated] = await clientRepo.update(id, data);
    if (rows === 0) throw new Error('Cliente não encontrado');
    return updated[0];
  },

  deleteClient: async (id) => {
    const deleted = await clientRepo.delete(id);
    if (!deleted) throw new Error('Cliente não encontrado');
    return deleted;
  }
};
