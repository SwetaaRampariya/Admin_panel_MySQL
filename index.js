const express = require('express');
const app = express();
const path = require ('path');

require('dotenv').config();

app.set("/views", path.join(__dirname));
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
const cookie = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookie());

app.use('/', require('./app/routes/route'));
 app.use('/', require('./app/routes/categoryRoute'));
// app.use('/', require('./app/routes/contactRouter'));
app.use('/', require('./app/routes/testimonialRoute'));
app.use('/', require('./app/routes/portfolioRoute'));

app.use(express.static('app/upload'));


app.get('/',function(req,res){
    res.render('login');
})

app.get('/registration',function(req,res){
    res.render('registration');
})

app.get('/verifyemail',function(req,res){
    res.render('verifyemail');
})

app.get('/addCategory',function(req,res){
    res.render('categoryAdd');
})

app.get('/addTestimonial',function(req,res){
    res.render('addTestimonial');
})

// app.get('/addPortfolio',function(req,res){
//     res.render('addPortfolio');
// })

app.listen('7000', () => {
    console.log('server started on port 7000');
})