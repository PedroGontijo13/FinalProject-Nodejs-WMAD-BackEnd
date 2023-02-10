import express from 'express'
import bodyParser from 'body-parser'
import UserRoute from './routes/user.js'

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//User router
app.use('/user', UserRoute)

app.listen('3000')