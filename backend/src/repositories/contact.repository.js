const Contact = require('../models/contact.model');

module.exports = {
  create: (data) => Contact.create(data),
  findAllByClientId: (clientId) => Contact.findAll({ where: { clientId } }),
  findById: (id) => Contact.findByPk(id),
  update: (id, data) => Contact.update(data, { where: { id }, returning: true }),
  delete: (id) => Contact.destroy({ where: { id } })
};
