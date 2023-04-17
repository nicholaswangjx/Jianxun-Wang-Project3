const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/UserRoute')
const authRoute = require('./routes/AuthRoute')
const twitterPostRoute = require('./routes/TwitterPostRoute')
require('dotenv').config()
const settings = require('./config')
const cors = require('cors')
const app = express()

// Connect to mongo DB
const connectDB = () => {
  mongoose
    .connect(settings.DATABASE_URL)
    .then(() => {
      console.log('connect to DATABASE')
    })
    .catch((err) => {
      throw err
    })
}

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)
app.use(cookieParser())
app.use(express.json())
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/twitterPost', twitterPostRoute)

// Start the server
app.listen(9000, () => {
  console.log('Starting server')
  connectDB()
  console.log('Listening to port 9000')
})
