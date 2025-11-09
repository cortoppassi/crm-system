const contactService = require('../services/contact.service');
const clientService = require('../services/client.service');

module.exports = {
    create: async (req, res) => {
        try {
            const contact = await contactService.createContact(req.body);
            res.status(201).json(contact);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    findAll: async (req, res) => {
        try {
            const { clientId } = req.query;
            if (!clientId) return res.status(400).json({ message: 'clientId é obrigatório' });
            const contacts = await contactService.getContactsByClientId(clientId);
            const client = await clientService.getClientById(clientId);
            res.json({ contacts, client });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    getAllContacts: async (req, res) => {
        try {
            const { clientId, page = 1, limit = 6, search = '' } = req.query

            const offset = (page - 1) * limit
            const { contacts, count, client } = await contactService.findAllPaginated(clientId, search, limit, offset)

            res.status(200).json({
                client,
                contacts,
                totalPages: Math.ceil(count / limit),
                currentPage: Number(page),
            })
        } catch (error) {
            console.error('Erro ao buscar contatos:', error)
            res.status(500).json({ message: 'Erro ao buscar contatos.' })
        }
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
