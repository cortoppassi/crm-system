const clientRepo = require('../repositories/client.repository.js');

module.exports = {
    createClient: async (data) => {
        try {
            return await clientRepo.create(data)
        } catch (error) {
            console.error('Erro no ClientService.createClient:', error)
            throw error
        }
    },

    getAllClients: async () => {
        try {
            return await clientRepo.findAll()
        } catch (error) {
            console.error('Erro no ClientService.getAllClients:', error)
            throw error
        }
    },

    findAllPaginated: async (search, limit, offset) => {
        try {
            return await clientRepo.findAllPaginated(search, limit, offset)
        } catch (error) {
            console.error('Erro no ClientService.findAllPaginated:', error)
            throw error
        }
    },

    getClientById: async (id) => {
        try {
            const client = clientRepo.findById(id);
            if (!client) throw new Error('Cliente não encontrado');
            return client;
        } catch (error) {
            console.error('Erro no ClientService.getClientById:', error)
            throw error
        }
    },

    updateClient: async (id, data) => {
        try {
            const client = clientRepo.update(id, data);
            if (!client) throw new Error('Cliente não encontrado');
            return client;
        } catch (error) {
            console.error('Erro no ClientService.updateClient:', error)
            throw error
        }
    },

    deleteClient: async (id) => {
        try {
            const deleted = clientRepo.delete(id);
            if (!deleted) throw new Error('Cliente não encontrado');
            return deleted;
        } catch (error) {
            console.error('Erro no ClientService.deleteClient:', error)
            throw error
        }
    },

    getAllClientsForChart: async () => {
        try {
            return await clientRepo.getAllForChart();
        } catch (error) {
            console.error('Erro no ClientService.getAllClientsForChart:', error)
            throw error
        }
    }
};
