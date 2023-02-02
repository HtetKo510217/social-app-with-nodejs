const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const app = express();

let sessionOptions = session({
    secret: 'nodejs is sooooo coooool',
    store: MongoStore.create({client : require('./db')}),
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 *24, httpOnly:true }
  })

app.use(sessionOptions)

const router = require('./router')

/* --- It just tell express to add the user submitted data onto our request object  ---*/
app.use(express.urlencoded({extended:false}))
app.use(express.json())

/* --- permision to access public folder  ---*/
app.use(express.static('public'))

/* --- ejs templete set up  ---*/
app.set('views','views')
app.set('view engine','ejs')

app.use('/',router);


module.exports = app