const contactRepo = require('../repositories/contact.repository');

module.exports = {
    createContact: async (data) => {
       const contact = await contactRepo.create(data);
       return contact;
    },

    getContactsByClientId: async (clientId) => {
        return contactRepo.findAllByClientId(clientId);
    },

    getContactById: async (id) => {
        const contact = await contactRepo.findById(id);
        if (!contact) throw new Error('Contato não encontrado');
        return contact;
    },

    updateContact: async (id, data) => {
        const updated = await contactRepo.update(id, data);
        if (!updated) throw new Error('Contato não encontrado');
        return updated; 
    },

    deleteContact: async (id) => {
        const deleted = await contactRepo.delete(id);
        if (!deleted) throw new Error('Contato não encontrado');
        return deleted;
    }
};
