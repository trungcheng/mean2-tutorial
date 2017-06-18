const express  = require('express');
const app      = express();
const mongoose = require('mongoose');
const config   = require('./config/db');
const path     = require('path');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
	if (err) {
		console.log('Connect to database error: ', err);
	} else {
		console.log('Connected to database: ', config.db);
	}
});

app.use(express.static(__dirname + '/client/dist/'));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
	console.log(`Express server is running at http://localhost:${port}`);
});

