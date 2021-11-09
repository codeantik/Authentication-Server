const express = require("express");
const User = require("../models/User");
const debug = require("debug")("codeantik-express:server");

const router = express.Router();

// email validation function using regex
emailValidation = (email) => {
	const emailRegexp =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	return emailRegexp.test(email);
};

router.get("/", (req, res) => {
	res.status(200).send("Hello, there! You are free to use this api");
})

router.post("/register", (req, res, next) => {
	// Check if user and password parameters are set
	if (req.body.username && req.body.password) {
		if (!emailValidation(req.body.email)) {
			res.status(400).json({
				message: `email not there`,
			});
		} else {
			// Check if user exists
			User.findOne({ email: req.body.email })
				.then((doc) => {
					if (!doc) {
						// Doesn't exist, create one
						const newUser = new User({
							username: req.body.username,
							password: req.body.password,
							email: req.body.email,
						});
	
						newUser
							.save()
							.then((doc) => {
								debug(`Created a new user: ${JSON.stringify(doc, null, 2)}`);
								res
									.status(201)
									.json({ message: "User successfully registered" });
							})
							.catch((err) => {
								debug(`Failed to create a new user: ${err}`);
								res
									.status(500)
									.json({ message: `Couldn't register new user: ${err}` });
							});
					} else {
						// A user with the username already exists, return errorsaa
						res.status(400).json({
							message: `${req.body.username} already exists in the DB `,
						});
					}
				})
				.catch((reason) => {
					res.status(500).json({ message: `Internal error ${reason}` });
				});
		}
	} else {
		res.status(401).json({ message: "Invalid form" });
	}
});

router.post("/login", (req, res, next) => {
	console.log(req.body);
	if (!req.body.email || !req.body.password) {
		res.status(401).json({ message: "No username/password passed" });
		next();
	}

	// Validate credential
	User.findOne({ email: req.body.email }, (err, doc) => {
		if (err) res.status(500).json({ message: `Error: ${err}` });

		if (!doc) {
			res
				.status(401)
				.json({ message: "User doesn't exist!" });
		} else {
			if (doc.password === req.body.password) {
				res.status(201).json({ message: "User successfully logged in" });
			} else {
				// console.log(req.body.password);
				// console.log(doc.password);
				res.status(401).json({
					message: "No user found with that password!",
				});
			}
		}

		// Doc found without errors, compare password
	});
});

router.get("/usersList", function (req, res) {
	User.find({}, function (err, users) {
		var userMap = {};

		users.forEach(function (user) {
			userMap[user._id] = user;
		});

		res.send(userMap);
	});
});
module.exports = router;
