const Contact = require('../models/contact.model');
const { Op, fn, col, where } = require('sequelize')

module.exports = {
    async findAllPaginated(clientId, search, limit, offset) {
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

    create: (data) => {
        return Contact.create(data);
    },

    findAllByClientId: (clientId) => {
        return Contact.findAll({ where: { clientId } });
    },

    findById: (id) => {
        return Contact.findByPk(id);
    },

    update: async (id, data) => {
        await Contact.update(data, { where: { id } });
        const updated = await Contact.findByPk(id);
        return updated;
    },

    delete: (id) => {
        return Contact.destroy({ where: { id } });
    },
};
