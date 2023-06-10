const express = require('express');
const router = express.Router();
const controller = require('../controllers/landing');

router.get('/', controller.getLanding);
router.post('/', controller.postNew);

router.get('/:id', controller.getHome);
router.post('/temp', controller.postOk);
router.post('/login', controller.postLogin);

module.exports = router;
