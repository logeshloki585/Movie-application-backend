const express = require('express');
const { signup, login, verifyToken, getUser, logout } = require('../controllers/userControllers');


const route = express.Router();


route.post('/signup',signup)
route.post('/login',login);
route.get('/getuser',verifyToken,getUser);
route.post('/logout',logout);


module.exports = route;