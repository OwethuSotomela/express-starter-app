const express = require('express');
const exphbs = require('express-handlebars');
var pizzaCart = require("./pizzaCart.js");
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3030;

// enable the req.body object - to allow us to use HTML forms
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable the static folder...
app.use(express.static('public'));

// add more middleware to allow for templating support
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
	useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/starter_express';

const pool = new Pool({
	connectionString: connectionString,
	ssl: {
		rejectUnauthorized: false
	}
});

var pizzaLog = pizzaCart(pool);
console.log(pool)

app.get('/', function (req, res) {
	res.render('index');
});

app.post('/orderSmall', function (req, res) {
	pizzaLog.OrderSmall(31.99);
	var Pizza = pizzaLog.GetcartList()
	res.render('index', {
		Pizza: Pizza.filter(pizza => (pizza.price).toFixed(2)),
	});
})
app.post('/orderMedium', function (req, res) {
	pizzaLog.OrderMedium(58.99);
	var Pizza = pizzaLog.GetcartList()
	res.render('index', {
		Pizza: Pizza.filter(pizza => (pizza.price).toFixed(2)),
	});
	console.log(Pizza.filter(pizza => (pizza.price).toFixed(2)))
})

app.post('/orderLarge', function (req, res) {
	pizzaLog.OrderLarge(98.99);
	var Pizza = pizzaLog.GetcartList()
	res.render('index', {
		Pizza: Pizza.filter(pizza => (pizza.price).toFixed(2)),
	});
	console.log(Pizza.filter(pizza => (pizza.price).toFixed(2)))
})
app.post('/order', function (req, res) {
	res.render('orders', {
		orders: pizzaLog.Orders()
	})
})

app.post('/button/:orderId/:statusDecide', function (req, res) {
	const { orderId, statusDecide } = req.params;
	pizzaLog.buttonStatus(statusDecide, orderId)
	res.render('orders', {
		orders: pizzaLog.Orders()
	})
})

app.post('/add/:sizeType', function (req, res) {
	const { sizeType } = req.params;
	console.log(sizeType)
	pizzaLog.AddQty(sizeType)
	res.render('index', {
		Pizza: pizzaLog.GetcartList(),
	});
})

app.post('/sub/:sizeType', function (req, res) {
	const { sizeType } = req.params;
	console.log(sizeType)
	pizzaLog.SubQty(sizeType)
	res.render('index', {
		Pizza: pizzaLog.GetcartList(),
	});
})

app.post('/back', function (req, res) {
	res.redirect('/')
})

// start  the server and start listening for HTTP request on the PORT number specified...
app.listen(PORT, function () {
	console.log(`App started on port ${PORT}`)
});