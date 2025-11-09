const clientRepo = require('../repositories/client.repository.js');

module.exports = {
    createClient: async (data) => clientRepo.create(data),

    getAllClients: async () => clientRepo.findAll(),

    findAllPaginated: async (search, limit, offset) => {
        try {
            return await clientRepo.findAllPaginated(search, limit, offset)
        } catch (error) {
            console.error('Erro no ClientService.findAllPaginated:', error)
            throw error
        }
    },

    getClientById: async (id) => {
        const client = clientRepo.findById(id);
        if (!client) throw new Error('Cliente não encontrado');
        return client;
    },

    updateClient: async (id, data) => {
        const client = clientRepo.update(id, data);
        if (!client) throw new Error('Cliente não encontrado');
        return client;
    },

    deleteClient: async (id) => {
        const deleted = clientRepo.delete(id);
        if (!deleted) throw new Error('Cliente não encontrado');
        return deleted;
    },

    getAllClientsForChart: async () => {
        return await clientRepo.getAllForChart();
    }
};
