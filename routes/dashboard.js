const express = require('express');
const router = express.Router();
const passport = require('passport');
const dashboard_controller = require('../controllers/dashboard_controller');
router.post('/add-habit', dashboard_controller.add_habit);
router.get("/dashboard", dashboard_controller.get_habit);
router.get("/user-view", dashboard_controller.changeView);
router.get("/status-update", dashboard_controller.updateStatus);
router.get("/remove", dashboard_controller.removeHabit);

module.exports = router