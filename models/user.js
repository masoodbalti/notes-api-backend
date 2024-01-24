const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    }
  
},{timestamps:true});

//Export the model
module.exports = mongoose.model('User', UserSchema);