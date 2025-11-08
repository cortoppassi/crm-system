const Client = require('../models/client.model');
const { Op } = require('sequelize')

module.exports = {
    create: (data) => {
        return Client.create(data);
    },

    findAll: () => Client.findAll(),

    findAllPaginated: (search, limit, offset) => {
        const where = search
            ? {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } }
                ]
            }
            : {}

        return Client.findAndCountAll({
            where,
            limit: Number(limit),
            offset: Number(offset),
            order: [['createdAt', 'DESC']]
        })
    },

    findById: (id) => Client.findByPk(id),

    update: async (id, data) => {
        await Client.update(data, { where: { id }, returning: true });
        const updated = await Client.findByPk(id);
        return updated;
    },

    delete: (id) => Client.destroy({ where: { id } }),
};
