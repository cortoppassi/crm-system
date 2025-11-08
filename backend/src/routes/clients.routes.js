const express = require('express');
const router = require('express').Router();
const ClientController = require('../controllers/client.controller.js');

router.post('/', ClientController.create);
router.get('/', ClientController.findAll);
router.get('/:id', ClientController.findById);
router.put('/:id', ClientController.update);
router.delete('/:id', ClientController.delete);

module.exports = {
    alias: '/clients',
    router
}
