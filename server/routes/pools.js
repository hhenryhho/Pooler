const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Pool = require('../models/pool');

router.post('/create', (req, res) => {
	const pool = new Pool({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		balance: req.body.balance,
	});
	pool.save()
		.then((result) => {
			console.log(result);
		})
		.catch((err) => console.log(err));
	res.status(201).json({
		message: 'Handling POST request to /pool',
		createdProfile: pool,
	});
});

// Returns a pool based off their name
router.get('/find-pool/:name', (req, res) => {
	const poolName = req.params.name;
	Pool.findOne({ name: poolName })
		.exec()
		.then((doc) => {
			console.log('From database', doc);
			if (doc) {
				res.status(200).json(doc);
			} else {
				res.status(404).json({ message: 'No valid entry found' });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

// Add a stock to the pool
router.post('/add-stock', (req, res) => {
	const filter = { name: req.body.name }; // Find the pool by name
	const update = { $addToSet: { stocks: req.body.stock } };
	Pool.findOneAndUpdate(filter, update, { new: true })
		.then((result) => {
			if (result !== null) {
				console.log(result);
				res.status(201).json({
					message: 'Added stock!',
				});
			} else {
				console.log('Cannot find user');
				res.status(404).json({
					message: 'Cannot find user',
				});
			}
		})
		.catch((err) => console.log(err));
});

// Add a participant to the pool
router.post('/add-participant', (req, res) => {
	const filter = { name: req.body.name }; // Find the pool by name
	const update = { $addToSet: { participants: req.body.email } };
	Pool.findOneAndUpdate(filter, update, { new: true })
		.then((result) => {
			if (result !== null) {
				console.log(result);
				res.status(201).json({
					message: 'Added participant!',
				});
			} else {
				console.log('Cannot find user');
				res.status(404).json({
					message: 'Cannot find user',
				});
			}
		})
		.catch((err) => console.log(err));
});

module.exports = router;
