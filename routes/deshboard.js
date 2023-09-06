const express = require('express');
const router = express.Router();
const passport = require('passport');
const deshboard_controller = require('../controllers/deshboard_controller');
router.post('/add-habit', deshboard_controller.add_habit);
router.get("/dashboard", deshboard_controller.get_habit);
router.get("/user-view", deshboard_controller.changeView);
router.get("/status-update", deshboard_controller.updateStatus);
router.get("/remove", deshboard_controller.removeHabit);

module.exports = router