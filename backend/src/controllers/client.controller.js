const ClientService = require('../services/client.service.js');

module.exports = {
  create: async (req, res) => {
    try {
      const client = await ClientService.createClient(req.body);
      res.status(201).json(client);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  },

  findAll: async (req, res) => {
    try {
      const clients = await ClientService.getAllClients();
      res.json(clients);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  findById: async (req, res) => {
    try {
      const client = await ClientService.getClientById(req.params.id);
      res.json(client);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const updated = await ClientService.updateClient(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const deleted = await ClientService.deleteClient(req.params.id);
      res.json(deleted);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  }
};
