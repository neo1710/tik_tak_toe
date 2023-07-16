const mongoose=require('mongoose');

const bkSchema=mongoose.Schema({
    token:{type:String,required:true}
})

const bkModel=mongoose.model('blacklist',bkSchema);

module.exports=bkModel;