const {Router}=require('express');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const userModel = require('../models/userModel');
const bkModel = require('../models/bkModel');
const auth = require('../authMiddleware');


const userRoute=Router();


userRoute.post('/register',async (req,res)=>{
    try {
        const check=await userModel.findOne({email:req.body.email,password:req.body.password});
        console.log(check)
        
        if(check){
            res.status(401).send({msg:'user already exist'});
        }else{
            const user=await userModel(req.body);
             await user.save();
            res.status(200).send({msg:'user created',user:user});
        }
    } catch (error) {

        res.status(400).send({msg:error});
    }
})

userRoute.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email,password});
        if(user){
         const token=jwt.sign({email,password},'neo');
         res.status(200).send({msg:'logged in',token:token}); 
        }else{
            res.status(401).send({msg:'user does not exist'});
        }
    } catch (error) {
        res.status(400).send({msg:error}); 
    }
})

userRoute.get('/logout',auth,async(req,res)=>{
    const {authorization}=req.headers;
    const token=authorization.split(" ")[1];
    try {
           const bk=await bkModel({token});
            await bk.save();
            res.status(200).send({msg:'logged out'});
    } catch (error) {
        res.status(400).send({msg:error}); 
    }
})



module.exports=userRoute;