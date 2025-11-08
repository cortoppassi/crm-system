const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Client = sequelize.define('Client', {
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
  tableName: 'clients'
});

module.exports = Client;
