const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const person_routes = require('./routes/person_routes');
const ApiError = require('./model/ApiError');
const auth_routes = require('./routes/auth_routes');
const AuthController = require('./controllers/authetication.contoller');
const config = require('./config');

let app = express();

// bodyParser zorgt dat we de body uit een request kunnen gebruiken,
app.use(bodyParser.json());

// Installeer Morgan als logger
app.use(morgan('dev'));

app.use('/api', auth_routes);

app.all('*', AuthController.validateToken);

app.use('/api', person_routes);

app.get('/api/greeting', function (req, res, next) {
	let mygreeting = {
		text: "Hello all!",
		author: "Robin Schellius"
	}
	res.send(mygreeting);
})

// Wanneer we hier komen bestond de gevraagde endpoint niet
app.use('*', function (req, res, next) {
	console.log('De endpoint die je zocht bestaat niet');
	next("Deze endpoint bestaat niet");
})

// catch-all error handler volgens Express documentatie
// http://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
	console.log('Catch-all error handler was called.');
	
	// Oud: console.log(err.toString());
	console.log(JSON.stringify(err));

	// Oud: const error = new ApiError(err.toString(), 404);
	const error = err;

	// Oud: res.status(404).json(error).end();
	res.status(error.code).json(error).end();
});

const port = process.env.PORT || config.webPort

app.listen(port, () => {
	console.log('De server draait op port ' + port);
});

module.exports = app