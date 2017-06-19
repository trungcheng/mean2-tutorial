'use strict';

const jwt 	  = require('jsonwebtoken');
const config  =	require('../config/db');

const Middleware = {

	handle: function(req, res, next){
		var token = req.headers['authorization'];

		if(token) {
			jwt.verify(token, config.secret, (err, decoded) => {
				if(err) {
					res.json({ status:false, data:{}, message:err });
				} else {
					req.decoded = decoded;
					next();
				}
			})
		} else {
			res.json({ status:false, data:{}, message:'No token provided' });
		}
	}
}

module.exports = Middleware;