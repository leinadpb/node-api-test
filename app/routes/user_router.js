const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user/user_controller');

router.get('/', user_controller.show);

module.exports = router;
