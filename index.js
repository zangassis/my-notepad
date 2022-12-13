require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

const noteRoutes = require('./routes/noteRoutes')

app.use('/note', noteRoutes)

app.get('/', (req, res) => {
    res.json({ message: 'Express is running...' })
})

mongoose.set("strictQuery", true);
mongoose.connect('mongodb://0.0.0.0:27017/noteDB', {
    useNewUrlParser: true
}).then(() => {
    console.log('MongoDB is connected!')
    app.listen(process.env.PORT)
}).catch((err) => console.log(err))