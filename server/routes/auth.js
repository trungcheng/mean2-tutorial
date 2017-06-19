const User = require('../models/user.model');

module.exports = (router) => {

	router.post('/register', (req, res) => {
		let username = req.body.username.toLowerCase() || '';
		let email = req.body.email.toLowerCase() || '';
		let password = req.body.password || '';

		if (email !== '') {
			req.checkBody('username', 'username is required').notEmpty();
			req.checkBody('email', 'email is required').notEmpty();
			req.checkBody('email', 'format email wrong').isEmail();
			req.checkBody('password', 'password is required').notEmpty();
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

	return router;
}