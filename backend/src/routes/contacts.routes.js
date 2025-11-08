const express = require('express');
const router = require('express').Router();
const ContactController = require('../controllers/contact.controller.js');

router.post('/', ContactController.create);
router.get('/', ContactController.findAll);
router.get('/:id', ContactController.findById);
router.put('/:id', ContactController.update);
router.delete('/:id', ContactController.delete);

module.exports = {
    alias: '/contacts',
    router
}
