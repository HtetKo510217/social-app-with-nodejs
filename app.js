const express = require('express');
const app = express();

const router = require('./router')

/* --- permision to access public folder  ---*/
app.use(express.static('public'))

/* --- ejs templete set up  ---*/
app.set('views','views')
app.set('view engine','ejs')

app.use('/',router);

app.listen('3000',()=> {
    console.log('server is runnig at port 3000');
})
