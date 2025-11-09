const router = require('express').Router();
const ClientController = require('../controllers/client.controller.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

router.get('/chart', authMiddleware,ClientController.getAllClientsForChart);
router.post('/', authMiddleware, ClientController.create);
router.get('/', authMiddleware, ClientController.findAll);
router.get('/paginated', authMiddleware, ClientController.getAllClients);
router.get('/:id', authMiddleware, ClientController.findById);
router.put('/:id', authMiddleware, ClientController.update);
router.delete('/:id', authMiddleware, ClientController.delete);

module.exports = {
    alias: '/clients',
    router
}
