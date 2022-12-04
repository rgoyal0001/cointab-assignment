const mongoose=require('mongoose')
require('dotenv').config()

const connectDatabase=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to the database...')

    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports={connectDatabase}