const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const UserSchema = new Schema ({
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  roles: [{type: String, ref: "Role"}],
  isActivated: {type: Boolean, default: false},
  activationLink: {type: String}
});

module.exports = User = mongoose.model('users', UserSchema);