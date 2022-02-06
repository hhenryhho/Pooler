const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });
const port = process.env.PORT || 5000;

const profileRoutes = require('./routes/profiles');
const poolRoutes = require('./routes/pools');

mongoose.connect(process.env.ATLAS_URI);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header(
			'Access-Control-Allow-Methods',
			'PUT, POST, PATCH, DELETE, GET'
		);
		return res.status(200).json({});
	}
	next();
});

// Routes which should handle requests
app.use('/profiles', profileRoutes);
app.use('/pools', poolRoutes);

app.get('/api', (req, res) => {
	res.json({ message: 'Coming from server' });
});

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
