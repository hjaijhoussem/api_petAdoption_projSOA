const express = require("express");
const authConroller = require("../controllers/authController");
const { body } = require('express-validator');
//const currentUser = require('../middlewars/currentUser');

const router = express.Router();

router.post('/api/users/signup',[
    body('email')
        .isEmail()
        .withMessage('email email'),
    body('password')
        .isLength({ min: 5 })
        .withMessage('password must be at least 5 caracters')
],authConroller.signUp);

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('email email'),
    body('password')
        .isLength({ min: 5 })
        .withMessage('password must be at least 5 caracters')
],authConroller.signIn);

router.get('/api/users/current-user', authConroller.onlineUser, authConroller.currentUser);

router.post('/api/users/singout', authConroller.signOut);

module.exports = router;