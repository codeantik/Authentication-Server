// import all modules, config files and dev tools

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
var http = require("http");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
var app = express();
const cors = require('cors');
var port = normalizePort(process.env.PORT || "5000");
var server = http.createServer(app);

// configure port output
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
	let port = parseInt(val, 10);

	if (isNaN(port)) {
		// named pipe
		return val;
	}

	if (port >= 0) {
		// port number
		return port;
	}

	return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
	if (error.syscall !== "listen") {
		throw error;
		console.log(error);
	}

	let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case "EACCES":
			console.error(bind + " requires elevated privileges");
			process.exit(1);
		case "EADDRINUSE":
			console.error(bind + " is already in use");
			process.exit(1);
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
	let addr = server.address();
	console.log("Listening on http://localhost:" + addr.port + "/users");
}


// DB Setup
mongoose
	.connect(process.env.DB_CONECTION, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((val) => console.log("Connected to DB"))
	.catch((err) => {
		if (err) {
			console.log(`Oops, didn't connect to DB: ${err}`);
		}
	});

// view engine setup
app.use(
	cors({
		origin: "*",
	})
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/// import modules files for user based transactions
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

///import module file for any base transactions
// const indexRouter = require("./routes/index");

// /// import module file for upload transactions
// const filesRouter = require("./routes/files");
