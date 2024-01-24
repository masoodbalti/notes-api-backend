// const user = require('../models/user');
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEy = "NOTESAPI";

const signup = async(req, res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    try{
        
        const existingUser = await userModel.findOne({
            email: req.body.email
        });
        if (existingUser){
            return res.status(400).json({message: 'User Already Exists'});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userModel.create({
        email: email,
        password: hashedPassword,
        username: username
    });
    const token = jwt.sign({email: result.email, id: result._id}, SECRET_KEy);
    res.status(201).json({user: result, token:token});
}
    catch(error){
        console.log(error);
        res.status(500).json({message: 'Something went Wrong'});
        
        }
};

const signin = async(req, res)=>{
    const email = req.body.email;
     const password = req.body.password;
    try{
         const existingUser = await userModel.findOne({
            email: email
        });
        if (!existingUser){
            return res.status(404).json({message: 'User not Exists'});
        }
        const matchedPassword = await bcrypt.compare(password, existingUser.password);
        if(!matchedPassword){
            return res.status(400).json({message: 'Invalid Credentials'});
        }
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, SECRET_KEy);
        res.status(201).json({user: existingUser, token:token});
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Something went Wrong'});

    }
    
    
};
module.exports = {signup, signin};