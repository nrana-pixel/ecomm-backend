const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");

if(process.env.NODE_ENV === "development"){
    router.post("/create",async function(req,res){
    try{
        let owner = await ownerModel.find();
        if(owner.length > 0){
            return res
            .status(503)
            .send("You dont have permission to this");
        } 
        let {fullname , email , password} = req.body;
        let createdowner= await ownerModel.create({
            
            fullname,
            email,
            password,
            
        });
        res.status(201).send(createdowner);

    }catch(err){
        console.log(err.message);
    }
})
}

router.get("/",function(req,res){
    res.send("hello owner");
})


module.exports = router;