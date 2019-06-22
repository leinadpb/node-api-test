const express = require('express');
const router = express.Router();
const auth_controller = require('../controllers/auth/auth_controller');

router.post('/signup', auth_controller.signUp);

router.post('/signin', auth_controller.signIn);

module.exports = router;
