const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controllers');
router.get('/', userController.welcome);
router.use('/dashboard', require('./dashboard'));

router.use('/user', require('./user'));
module.exports = router;