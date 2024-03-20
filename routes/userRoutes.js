const express = require('express');
const router = express.Router();
const UserModel = require('../models/userModel')

router.get('/getusers', UserModel.GetUsers);

router.get('/getuser/:id', UserModel.GetUser);

router.get('/getuserbyep/', UserModel.GetUserByEmailAndPassword);

router.post('/adduser', UserModel.AddUser);

router.delete('/deleteuser/:id', UserModel.DeleteUser);

router.put('/updateuser/:id', UserModel.UpdateUser);

module.exports = router;

