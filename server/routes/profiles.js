const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const profile = require('../models/profile');

const Profile = require('../models/profile');

router.post('/create', (req, res) => {
	const profile = new Profile({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		balance: req.body.balance,
	});
	profile
		.save()
		.then((result) => {
			console.log('Added to profiles', result);
		})
		.catch((err) => console.log(err));
	res.status(201).json({
		message: 'Handling POST request to /profiles',
		createdProfile: profile,
	});
});

// Returns a user based off their email
router.get('/find-user/:email', (req, res) => {
	const email = req.params.email;
	Profile.findOne({ name: email })
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

// Edit balance of a user based off given email
router.post('/edit-balance', (req, res) => {
	const filter = { name: req.body.name };
	const update = { balance: req.body.balance };
	Profile.findOneAndUpdate(filter, update)
		.then((result) => {
			if (result !== null) {
				console.log(result);
				res.status(201).json({
					message: 'Edit complete!',
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

// Add friend of user based off given email
router.post('/add-friend', (req, res) => {
	const filter = { name: req.body.name };
	const update = { $addToSet: { friendList: req.body.email } };
	Profile.findOneAndUpdate(filter, update, { new: true })
		.then((result) => {
			if (result !== null) {
				console.log(result);
				res.status(201).json({
					message: 'Added friend!',
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

// Add a pool to a profile
router.post('/add-pool', (req, res) => {
	const filter = { name: req.body.name };
	const update = { $addToSet: { pools: req.body.poolName } };
	Profile.findOneAndUpdate(filter, update, { new: true })
		.then((result) => {
			if (result !== null) {
				console.log(result);
				res.status(201).json({
					message: 'Added pool!',
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
