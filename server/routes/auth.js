const User 	  	 = require('../models/user.model');
const jwt  	  	 = require('jsonwebtoken');
const config  	 = require('../config/db');
const middleware = require('../middleware/auth.middleware');

module.exports = (router) => {

	router.post('/register', (req, res) => {
		let username = req.body.username.toLowerCase() || '';
		let email = req.body.email.toLowerCase() || '';
		let password = req.body.password || '';

		if (email !== '') {
			req.checkBody('username', 'Username is required').notEmpty();
			req.checkBody('email', 'Email is required').notEmpty();
			req.checkBody('email', 'Format email wrong').isEmail();
			req.checkBody('password', 'Password is required').notEmpty();
			let errors = req.validationErrors();
			if(!errors) {
				let user = new User({
					username: username,
					email: email,
					password: password // bcrypt.hashSync(password, bcrypt.genSaltSync(5)),
				});
				user.save((err) => {
					if (err) {
						if (err.code === 11000) {
							res.json({status: false, data: [], message: 'Username or email already exists!'});
						} else {
							res.json({status: false, data: [], message: 'Could not save user!'});
						}
					} else {
						res.json({status: true, data: [], message: 'Register successfully!'});
					}
				});
			} else {
				res.json({status: false, data: [], message: 'Validate failed, please try again!'});
			}
		} else {
			res.json({status: false, data: [], message: 'Validate failed, please try again!'});
		}
	});

	router.get('/checkEmail/:email', (req, res) => {
		if (!req.params.email) {
			res.json({ status: false, meesage: 'Email was not provided!' });
		} else {
			User.findOne({ email: req.params.email }, (err, user) => {
				if (err) {
					res.json({ status: false, message: err });
				} else {
					if (user) {
						res.json({ status: false, message: 'Email is already taken!' });
					} else {
						res.json({ status: true, message: 'Email is available!' });
					}
				}
			});
		}
	});

	router.get('/checkUsername/:username', (req, res) => {
		if (!req.params.username) {
			res.json({ status: false, meesage: 'Username was not provided!' });
		} else {
			User.findOne({ username: req.params.username }, (err, user) => {
				if (err) {
					res.json({ status: false, message: err });
				} else {
					if (user) {
						res.json({ status: false, message: 'Username is already taken!' });
					} else {
						res.json({ status: true, message: 'Username is available!' });
					}
				}
			});
		}
	});

	router.post('/login', (req, res) => {
		let username = req.body.username.toLowerCase() || '';
		let password = req.body.password || '';

		req.checkBody('username', 'Username is required').notEmpty();
		req.checkBody('password', 'Password is required').notEmpty();
		let errors = req.validationErrors();
		if(!errors) {
			User.findOne({ username: username }, (err, user) => {
				if (err) {
					res.json({ status: false, message: err });
				} else {
					if (!user) {
						res.json({ status: false, message: 'Username not found!' });
					} else {
						const validPassword = user.comparePassword(password);
						if (!validPassword) {
							res.json({ status: false, message: 'Password invalid!' });
						} else {
							const token = jwt.sign(
								{ userId: user._id }, 
								config.secret,
								{ expiresIn: '24h' }
							);
							res.json({ status: true, data: { user: username, token: token }, message: 'Login successfully!' });
						}
					}
				}
			});
		} else {
			res.json({status: false, message: 'Username and password is required!'});
		}
	});

	router.get('/profile', middleware.handle, (req, res) => {
		User.findOne({ _id: req.decoded.userId }).select('username email').exec((err, user) => {
			if (err) {
				res.json({ status: false, message: err });
			} else {
				if (!user) {
					res.json({ status: false, message: 'User not found!' });
				} else {
					res.json({ status: true, data: { user: user } });
				}
			}
		});
	});

	return router;
}