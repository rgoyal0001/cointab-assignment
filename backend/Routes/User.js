const express=require('express')
const cors=require('cors')
const {CreateUser,LoginUser,checkToken} =require('../Handler/User')
const UserRouter=express.Router();

UserRouter.post('/register',CreateUser)
UserRouter.post('/login',LoginUser)
UserRouter.post('/verify',checkToken)

module.exports=UserRouter;