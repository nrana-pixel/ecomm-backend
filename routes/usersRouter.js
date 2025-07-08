const express = require('express')
const router = express.Router();
const userModel = require('../models/user-model');
const {registerUser} = require("../controllers/auth-controller")
const {loginUser} = require("../controllers/auth-controller");
const {logoutUser} = require("../controllers/auth-controller");

router.get("/",function(req,res){
    res.send("users");
})

router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/logout",logoutUser);

module.exports = router;