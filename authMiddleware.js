const jwt=require('jsonwebtoken');
const bkModel = require('./models/bkModel');

const auth=async(req,res,next)=>{
   try {
    const {authorization}=req.headers;
    const token=authorization.split(" ")[1];
    const user=jwt.verify(token,'neo');
    if(!user){
        res.status(400).send({msg:'unauthorized token'});
    }else if(user){
    console.log(user);
    const check=await bkModel.findOne({token});
    if(check){
        res.status(400).send({msg:'login first'});
    }
    } else{
        next();
       }
   } catch (error) {
    res.status(400).send({msg:error});
   }
 
}

module.exports=auth;