const express = require('express');
const exphbs  = require('express-handlebars');
// const bodyParser = require('body-parser');
var pizzaCart = require("./pizzaCart.js");

const app = express();
const PORT =  process.env.PORT || 3030;

// enable the req.body object - to allow us to use HTML forms
// app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable the static folder...
app.use(express.static('public'));

// add more middleware to allow for templating support

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

let counter = 0;
var pizzaLog = pizzaCart();

app.get('/', function(req, res) {
	res.render('index');
});

app.post('/count', function(req, res) {
	counter++;
	res.redirect('/')
});

app.post('/orderSmall', function(req, res){
	pizzaLog.OrderSmall(31.99);
	res.render('index',{
		Pizza: pizzaLog.GetcartList(),
	});
})
app.post('/orderMedium', function(req, res){
	let medium = req.body.mediumPrice;
	pizzaLog.OrderMedium(58.99);
	console.log(pizzaLog.GetcartList())
	res.render('index',{
		Pizza: pizzaLog.GetcartList(),
	});
})
app.post('/orderLarge', function(req, res){
	let large = req.body.largePrice;
	console.log(large);
	res.render('index',{
		Pizza: pizzaLog.GetcartList(),
	});
})
app.post('/order', function(req, res){
	res.render('addPizza')
})

app.post('/add/:sizeType', function(req, res){
	const { sizeType } = req.params;
	console.log(sizeType)
	pizzaLog.AddQty(sizeType)
	res.render('index',{
		Pizza: pizzaLog.GetcartList(),
	});
})

app.post('/sub/:sizeType', function(req, res){
	const { sizeType } = req.params;
	console.log(sizeType)
	pizzaLog.SubQty(sizeType)
	res.render('index',{
		Pizza: pizzaLog.GetcartList(),
	});
})

app.post('/back', function(req, res){
	res.redirect('/')
})

// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function() {
	console.log(`App started on port ${PORT}`)
});