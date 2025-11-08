const contactRepo = require('../repositories/contact.repository.js');

module.exports = {
  createContact: async (data) => {
    return await contactRepo.create(data);
  },

  getContactsByClientId: async (clientId) => {
    return await contactRepo.findAllByClientId(clientId);
  },

  getContactById: async (id) => {
    const contact = await contactRepo.findById(id);
    if (!contact) throw new Error('Contato não encontrado');
    return contact;
  },

  updateContact: async (id, data) => {
    const [rows, updated] = await contactRepo.update(id, data);
    if (rows === 0) throw new Error('Contato não encontrado');
    return updated[0];
  },

  deleteContact: async (id) => {
    const deleted = await contactRepo.delete(id);
    if (!deleted) throw new Error('Contato não encontrado');
    return deleted;
  }
};
