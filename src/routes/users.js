// ************ Require's ************
const express = require('express');
const router = express.Router();
// const {check} = require("express-validator")

// ************ Controller Require ************
const {formRegister, register} = require('../controllers/usersController');

router.get('/register', formRegister); 
router.post('/register', register); 

module.exports = router;