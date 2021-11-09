const mongoose = require("mongoose");
const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema({
	username: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true },
	email: { type: String, required: true },
});

module.exports = mongoose.model("Auth-User", UserSchema);
