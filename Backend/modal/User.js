const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Email:{
        type:String
    },
    SecretKey:{
        type:String
    }
})

module.exports =  mongoose.model('User',userSchema);