const express=require('express');
const mongoose=require('mongoose');
const userRoute = require('./routes/userRoutes');
const cors = require('cors');
require("dotenv").config();
const app=express();
app.use(express.json());
app.use('/users',userRoute);
app.use(cors())
app.get('/',(req,res)=>{
res.send('homepage')
})

app.listen(8080,async ()=>{
   try {
    await mongoose.connect(`${process.env.URL}first`);
    console.log('connect');
    console.log('run 8080');
   } catch (error) {
    console.log(process.env.URL);
   } 
})