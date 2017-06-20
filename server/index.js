const express 			= require('express');
const router 			= express.Router();
const app 				= express();
const expressValidator 	= require('express-validator');
const bodyParser 		= require('body-parser');
const mongoose 		    = require('mongoose');
const config   		    = require('./config/db');
const path     		    = require('path');
const cors				= require('cors');
const auth	   		    = require('./routes/auth')(router);

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
	if (err) {
		console.log('Connect to database error: ', err);
	} else {
		console.log('Connected to database: ', config.db);
	}
});

app.use(cors({
	origin: 'http://localhost:4200'
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

app.use('/client', express.static('./client'));
app.use('/auth', auth);

app.get('/', function(req, res) {
	res.sendFile('index.html', { root: './client/src' });
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
	console.log(`Express server is running at http://localhost:${port}`);
});

