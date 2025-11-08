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

    getAllClients: async (req, res) => {
        try {
            const { page = 1, search = '', limit = 6 } = req.query

            const offset = (page - 1) * limit

            const { rows, count } = await ClientService.findAllPaginated(search, limit, offset)

            res.status(200).json({
                clients: rows,
                totalPages: Math.ceil(count / limit),
                currentPage: Number(page)
            })
        } catch (error) {
            console.error('Erro ao buscar clientes:', error)
            res.status(500).json({ message: 'Erro ao buscar clientes.' })
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
