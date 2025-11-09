const router = require('express').Router();
const ContactController = require('../controllers/contact.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

router.post('/', authMiddleware, ContactController.create);
router.get('/', authMiddleware, ContactController.findAll);
router.get('/paginated', authMiddleware, ContactController.getAllContacts)
router.get('/:id', authMiddleware, ContactController.findById);
router.put('/:id', authMiddleware, ContactController.update);
router.delete('/:id', authMiddleware, ContactController.delete);

module.exports = {
    alias: '/contacts',
    router
}
