const Contact = require('../models/contact.model');
const { Op, fn, col, where } = require('sequelize')

module.exports = {
    findAllPaginated: async (clientId, search, limit, offset) => {
        try {
            const normalizedSearch = search ? search.toLowerCase() : ''

            const whereCondition = {
                [Op.and]: [
                    { clientId },
                    normalizedSearch
                        ? {
                            [Op.or]: [
                                where(fn('lower', col('name')), { [Op.like]: `%${normalizedSearch}%` }),
                                where(fn('lower', col('email')), { [Op.like]: `%${normalizedSearch}%` }),
                                where(fn('lower', col('phone')), { [Op.like]: `%${normalizedSearch}%` }),
                            ],
                        }
                        : {},
                ],
            }

            const { rows, count } = await Contact.findAndCountAll({
                where: whereCondition,
                limit: Number(limit),
                offset: Number(offset),
                order: [['createdAt', 'DESC']],
            })

            return { rows, count }
        } catch (error) {
            console.error('Erro no ContactRepository.findAllPaginated:', error)
            throw error
        }
    },

    create: async (data) => {
        try {
            return await Contact.create(data);
        } catch (error) {
            throw new Error('Erro ao criar contato: ' + error.message);
        }
    },

    findAllByClientId: async (clientId) => {
        try {
            return await Contact.findAll({ where: { clientId } });
        } catch (error) {
            throw new Error('Erro ao buscar contatos: ' + error.message);
        }
    },

    findById: async (id) => {
        try {
            return await Contact.findByPk(id);
        } catch (error) {
            throw new Error('Erro ao buscar contato: ' + error.message);
        }
    },

    update: async (id, data) => {
        try {
            await Contact.update(data, { where: { id } });
            const updated = await Contact.findByPk(id);
            return updated;
        } catch (error) {
            throw new Error('Erro ao atualizar contato: ' + error.message);
        }
    },

    delete: async (id) => {
        try {
            return await Contact.destroy({ where: { id } });
        } catch (error) {
            throw new Error('Erro ao deletar contato: ' + error.message);
        }
    },
};
