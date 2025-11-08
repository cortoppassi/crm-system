const clients = []; // mock temporário

module.exports = {
  create: (req, res) => {
    const client = { id: Date.now(), ...req.body };
    clients.push(client);
    res.status(201).json(client);
  },

  findAll: (req, res) => {
    res.json(clients);
  },

  findById: (req, res) => {
    const client = clients.find(c => c.id === Number(req.params.id));
    if (!client) return res.status(404).json({ message: 'Cliente não encontrado' });
    res.json(client);
  },

  update: (req, res) => {
    const index = clients.findIndex(c => c.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Cliente não encontrado' });
    clients[index] = { ...clients[index], ...req.body };
    res.json(clients[index]);
  },

  delete: (req, res) => {
    const index = clients.findIndex(c => c.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Cliente não encontrado' });
    const deleted = clients.splice(index, 1);
    res.json(deleted[0]);
  }
}
