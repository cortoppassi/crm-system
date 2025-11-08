const contactService = require('../services/contact.service');
const clientService = require('../services/client.service');

module.exports = {
  create: async (req, res) => {
    const contact = await contactService.createContact(req.body);
    res.status(201).json(contact);
  },

  findAll: async (req, res) => {
    const { clientId } = req.query;
    if (!clientId) return res.status(400).json({ message: 'clientId é obrigatório' });
    const contacts = await contactService.getContactsByClientId(clientId);
    const client = await clientService.getClientById(clientId);
    res.json({ contacts, client });
  },

  findById: async (req, res) => {
    try {
      const contact = await contactService.getContactById(req.params.id);
      res.json(contact);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const updated = await contactService.updateContact(req.params.id, req.body);
      console.log(updated);
      res.json(updated);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const deleted = await contactService.deleteContact(req.params.id);
      res.json(deleted);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};
