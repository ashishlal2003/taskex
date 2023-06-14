const express = require('express');
const router = express.Router();
const {
    getLanding,
    postNew,
    getHome,
    postOk,
    postLogin,
    isAuth,
    logout
} = require('../controllers/landing');

router.get('/:id', isAuth, getHome);
router.get('/', getLanding);
router.post('/', postNew);

router.post('/temp',postOk);
router.post('/login',postLogin);
router.post('/logout', logout);


module.exports = router;
