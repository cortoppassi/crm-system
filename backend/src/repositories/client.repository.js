const Client = require('../models/client.model');
const { Op } = require('sequelize')

module.exports = {
    create: async(data) => {
        try {
            return await Client.create(data);
        } catch (error) {
            console.error('Erro no client.repository.create:', error)
            throw error
        }
    },

    findAll: async() => {
        try {
            return await Client.findAll();
        } catch (error) {
            console.error('Erro no client.repository.findAll:', error)
            throw error
        }
    },

    findAllPaginated: async (search, limit, offset) => {
        try {
            const where = search
                ? {
                    [Op.or]: [
                        { name: { [Op.like]: `%${search}%` } },
                        { email: { [Op.like]: `%${search}%` } }
                    ]
                }
                : {}

            return await Client.findAndCountAll({
                where,
                limit: Number(limit),
                offset: Number(offset),
                order: [['createdAt', 'DESC']]
            })
        } catch (error) {
            console.error('Erro no client.repository.findAllPaginated:', error)
            throw error
        }
    },

    findById: async (id) => {
        try {
            return await Client.findByPk(id);
        } catch (error) {
            console.error('Erro no client.repository.findById:', error)
            throw error
        }
    },

    update: async (id, data) => {
        try {
            await Client.update(data, { where: { id }, returning: true });
            const updated = await Client.findByPk(id);
            return updated;
        } catch (error) {
            console.error('Erro no client.repository.update:', error)
            throw error
        }
    },

    getAllForChart: async () => {
        try {
        return await Client.findAll({
            attributes: ['id', 'name', 'createdAt'],
            order: [['createdAt', 'ASC']]
        });
        } catch (error) {
            console.error('Erro no client.repository.getAllForChart:', error)
            throw error
        }
    },

    delete: async (id) => {
        try {
        return await Client.destroy({ where: { id } });
        } catch (error) {
            console.error('Erro no client.repository.delete:', error)
            throw error
        }   
    },
};
