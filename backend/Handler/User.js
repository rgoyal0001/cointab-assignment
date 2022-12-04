const {UserModel} =require('../Database/Users')
const jwt=require('jsonwebtoken')
require('dotenv').config()

const CreateUser=async(req,res)=>{
    try {
        const newUser=req.body;
        let existingUser=await UserModel.findOne({
            email:newUser.email,
            password:newUser.password
        })

        if(existingUser){
            return res.status(400).send({
                message:"User already exists..."
            })
        }

        let User=await UserModel(newUser)
        await User.save();
        User=User.toJSON();
        delete User.password;

        res.status(201).send(User);
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:error.message
        })
    }
}

const LoginUser=async(req,res)=>{
    try {
        const {email,password}=req.body
        const User=await UserModel.findOne({email}).populate('password')
        if(!User){
            return res.status(400).send({message:"Entered User details are not found !!!"})
        }
        else{
            if (User.password === password) {
                const email=User.email;
                const password=User.password;
                console.log(password)
                 const token = jwt.sign({ id: User._id, email: User.email, name: User.name }, process.env.SECRET);
                 return res.status(200).send({token,email,password});
             }
             else {
                 
                 if(User.password!=password){
                     User.block=+ new Date();
                     return res.status(400).send({
                         message: "Password is incorrect",
                         wrongPassword:password
                     })
                 }
                
                
             }
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:error.message
        })
    }
}


const checkToken=async(req,res)=>{
    try {
        const {token}=req.headers;
        const decode=jwt.verify(token,process.env.SECRET)
        if(decode){
            return res.status(200).send({token})
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports={
    CreateUser,
    LoginUser,
    checkToken
}