const { listenerCount } = require('../../db/models/appoint/index');
const Appoint = require('../../db/models/appoint/index');

module.exports.getAllAppoints = (req, res) => {
  Appoint.find().then(result => {
    res.send({data: result});
  }).catch(err => res.send('записи нет'));
};

module.exports.addNewAppoint = async (req, res) => {
  const appoint = new Appoint(req.body);
  appoint.save().then(result => {
    Appoint.find().then(result1 => res.send({data: result1}));
  })  
};

// module.exports.editAppoint = async (req, res) =>  {
//   const {login, password} = req.body;
// };