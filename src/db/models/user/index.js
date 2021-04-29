const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema ({
  login: String,
  password: String
});

module.exports = User = mongoose.model('usersOfHospital', UserSchema);