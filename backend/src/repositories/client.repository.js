const Client = require('../models/client.model');

module.exports = {
  create: (data) => Client.create(data),
  findAll: () => Client.findAll(),
  findById: (id) => Client.findByPk(id),
  update: (id, data) => Client.update(data, { where: { id }, returning: true }),
  delete: (id) => Client.destroy({ where: { id } })
};
