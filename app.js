const express = require('express');
const app = express();

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