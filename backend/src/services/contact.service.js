const contactRepo = require('../repositories/contact.repository');
const clientService = require('./client.service');

module.exports = {
    findAllPaginated: async (clientId, search, limit, offset) => {
        try {
            const { rows, count } = await contactRepo.findAllPaginated(clientId, search, limit, offset)
            const client = await clientService.getClientById(clientId)

            return { contacts: rows, count, client }
        } catch (error) {
            console.error('Erro no ContactService.findAllPaginated:', error)
            throw error
        }
    },

    createContact: async (data) => {
        try {
            const contact = await contactRepo.create(data);
            return contact;
        } catch (error) {
            throw new Error('Erro ao criar contato: ' + error.message);
        }
    },

    getContactsByClientId: async (clientId) => {
        try {
            return contactRepo.findAllByClientId(clientId);
        } catch (error) {
            throw new Error('Erro ao buscar contatos: ' + error.message);
        }
    },

    getContactById: async (id) => {
        try {
            const contact = await contactRepo.findById(id);
            if (!contact) throw new Error('Contato não encontrado');
            return contact;
        } catch (error) {
            throw new Error('Erro ao buscar contato: ' + error.message);
        }
    },

    updateContact: async (id, data) => {
        try {
            const updated = await contactRepo.update(id, data);
            if (!updated) throw new Error('Contato não encontrado');
            return updated;
        } catch (error) {
            throw new Error('Erro ao atualizar contato: ' + error.message);
        }
    },

    deleteContact: async (id) => {
        try {
            const deleted = await contactRepo.delete(id);
            if (!deleted) throw new Error('Contato não encontrado');
            return deleted;
        } catch (error) {
            throw new Error('Erro ao deletar contato: ' + error.message);
        }
    }
};
