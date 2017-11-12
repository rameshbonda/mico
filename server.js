var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//API START
var mongoose = require('mongoose');

//Local db
//mongoose.connect('mongodb://localhost/residentdbnew');

//Mongo lab db
mongoose.connect('mongodb://ramesh:ramesh@ds155325.mlab.com:55325/micoproducts')

var Products = require('./models/products.js');

//Get Products list
app.get('/products', function(req, res) {
	var query = {}
	Products.find(query, 'productName productPrice', function(err, products) {
		if(err) {
			throw err;
		} else {
			res.json(products);
		}
	})
}) 

//API END

app.get('/', function(req, res) {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.use('/', function(req, res) {
	res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;