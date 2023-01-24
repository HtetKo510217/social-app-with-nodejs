const express = require('express');
const app = express();

/* --- permision to access public folder  ---*/
app.use(express.static('public'))

/* --- ejs templete set up  ---*/
app.set('views','views')
app.set('view engine','ejs')

app.get('/',(req,res)=> {
    res.render('home-guest')
})

app.listen('3000',()=> {
    console.log('server is runnig at port 3000');
})
