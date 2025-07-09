const express = require('express');
const { register } = require('../controllers/authControllers');
const {Login}  = require('../controllers/authControllers')

const router = express.Router();

router.post('/register/', register);
router.post('/Login',Login)

module.exports = router;