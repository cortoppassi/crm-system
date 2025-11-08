const contacts = []; // mock temporário

module.exports = {
  create: (req, res) => {
    const contact = { id: Date.now(), ...req.body };
    contacts.push(contact);
    res.status(201).json(contact);
  },

  findAll: (req, res) => {
    res.json(contacts);
  },

  findById: (req, res) => {
    const contact = contacts.find(c => c.id === Number(req.params.id));
    if (!contact) return res.status(404).json({ message: 'Contato não encontrado' });
    res.json(contact);
  },

  update: (req, res) => {
    const index = contacts.findIndex(c => c.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Contato não encontrado' });
    contacts[index] = { ...contacts[index], ...req.body };
    res.json(contacts[index]);
  },

  delete: (req, res) => {
    const index = contacts.findIndex(c => c.id === Number(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Contato não encontrado' });
    const deleted = contacts.splice(index, 1);
    res.json(deleted[0]);
  }
}
