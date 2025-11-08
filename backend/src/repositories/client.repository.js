const Client = require('../models/client.model');

module.exports = {
  create: (data) => {
    console.log('Creating client with data:', data);
    return Client.create(data);
  },
  findAll: () => Client.findAll(),
  findById: (id) => Client.findByPk(id),
  update: async (id, data) =>{
    await Client.update(data, { where: { id }, returning: true });
    const updated = await Client.findByPk(id);
    return updated;
  },
  delete: (id) => Client.destroy({ where: { id } }),
};
