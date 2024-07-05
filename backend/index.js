const path = require("path");
const connectDB = require("./config/dbConnection")
const express = require("express");
const cors = require("cors")
const fileUpload = require("express-fileupload")
const adminRoute = require("./routes/adminRouter")
const userRoute = require("./routes/userRouter")
const postRoute = require("./routes/postRouter")
const userQueryRoute = require("./routes/userQueryRouter")
const cron = require("cron")

//Express instance
const app = express()

//Middleware
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.json())
app.use(cors())
app.use(fileUpload());

var whitelist = ['http://localhost:3000']

function restrictRequest(req, res, next) {
  if (whitelist.includes(req.headers['origin'])) {
    next()
  } else {
    res
      .status(200)
      .json({
        success: false,
      })
  } 
}

app.get('/check', restrictRequest, (req, res) => {
    console.log("Checking cors");
    res.json({
      success: true,
    })
})

//Routes
app.use(restrictRequest)
app.use('/admin', adminRoute)
app.use('/user', userRoute)
app.use('/post', postRoute)
app.use('/query', userQueryRoute)

//env configuration
require('dotenv').config({path: path.join(__dirname, 'env', '.env')})

//Database connection
connectDB()


//Server connection
const port = process.env.PORT
app.listen(port, () => console.log(`Server is listening to the port ${port}`))