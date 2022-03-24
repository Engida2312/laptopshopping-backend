const { json } = require('express');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const app = express();
const router = require('./router');    
const bodyParser = require('body-parser')

let sessionOptions = session({
    secret: "sis project secret",
    store: MongoStore.create({ client: require('./db') }),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true }
})
app.use(sessionOptions);


app.use(express.urlencoded({ extended: false }));//used for submiting 'HTML form' data(so that we can get the data using req.body)
app.use(json());//used for submiting json formated data

app.use(express.static('public'));

//configuring templete engine
app.set('views', 'Views')
app.set('view engine', 'ejs')

app.use('/', router);



module.exports = app