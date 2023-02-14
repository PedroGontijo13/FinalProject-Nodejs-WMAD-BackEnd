import express from 'express'
import bodyParser from 'body-parser'
import UserRoute from './routes/user.route.js'
import indexRoute from './routes/index.route.js'

const app = express()

// Set up the EJS template engine
app.set('view engine', 'ejs');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())

// parse application/json
app.use(bodyParser.json());

app.use('/', indexRoute) 

//User router
app.use('/user', UserRoute)

app.listen('3001')