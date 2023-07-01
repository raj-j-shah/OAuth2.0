const mongoose = require('mongoose');
const user = mongoose.model('user',{
    id:{
        type:Number
    },
    name:{
        type:String
    }
})
module.exports=user;
