const Contact = require('../models/contact.model');

module.exports = {
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
