const mongoose = require("mongoose")
const path = require("path");

require('dotenv').config({path: path.join(__dirname, 'config.env')})

async function connectDB() {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB is connected to ${connect.connection.host}:${connect.connection.port}`)
    } catch(e) {
        console.log(e);
    }
}

module.exports = connectDB
