const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Client = require('./client.model');

const Contact = sequelize.define('Contact', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true, 
  tableName: 'contacts'
});

Client.hasMany(Contact, { foreignKey: 'clientId', onDelete: 'CASCADE' });
Contact.belongsTo(Client, { foreignKey: 'clientId' });

module.exports = Contact;
