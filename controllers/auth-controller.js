const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require("../models/user-model");
const { generateToken } = require("../utils/token-gen");

module.exports.registerUser = async function(req,res){

try{
    let{fullname , email , password} = req.body;
    const user = await userModel.findOne({email});
    if(user) return res.status(401).send("User already exists");

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async (err,hash)=>{
            if(err) return console.log(err.message);
            let createduser = await userModel.create({
                fullname,
                email,
                password: hash
            })
            let token = generateToken(createduser);
            res.cookie("token",token);
            res.redirect("/");
        })
    })
}catch(err){
    console.log(err.message);
}
}

module.exports.loginUser = async (req,res)=>{
    try{
        let {email,password} = req.body;
        let user = await userModel.findOne({email});
        if(!user) return res.send("Something went wrong");

        bcrypt.compare(password,user.password,(err,result)=>{
            if(!result){
                return res.redirect("/");
            }
            let token = generateToken(user);
            res.cookie("token",token);
            res.redirect("/shop");
        })
    }catch(err){
        return console.log(err.message);
    }
}

module.exports.logoutUser = (req,res)=>{
    res.cookie("token","");
    res.redirect("/");
}