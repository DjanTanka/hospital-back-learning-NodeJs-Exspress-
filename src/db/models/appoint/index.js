const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AppointSchema = new Schema ({
  fio: String,
  doctor: String,
  date: String,
  complaint: String
});

module.exports = Appoint = mongoose.model('appointOfHospital', AppointSchema);