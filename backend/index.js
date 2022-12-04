const express=require('express');
const cors=require('cors')
const {connectDatabase}=require('./Database/index')
const UserRouter=require('./Routes/User')
require('dotenv').config()

const app=express();
app.use(express.json())
app.use(cors())
app.use(UserRouter)

app.get('/',(req,res)=>{
    res.send('server started...')
})
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`)
    next()
})

connectDatabase().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`connected to port ${process.env.PORT}`)
    })
})