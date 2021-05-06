const bcrypt = require('bcryptjs');
const User = require('../../db/models/user/index');

module.exports.getAllUsers = (req, res) => {
  User.find().then(result => {
    res.send({data: result});
  });
};

module.exports.addNewUser = async (req, res) => {
  const {login, password} = req.body;
  const candidateLogin = await User.findOne({login: login});
  if (candidateLogin) {
    res.status(409).send({err: "This login is occupied"});
  } else {
    const salt = bcrypt.genSaltSync(10);
    const user = new User({
      login: login,
      password: bcrypt.hashSync(password, salt)
    });
    user.save().then(result => {
      res.status(201).send("пользователь добавлен");
    });   
  };
};

module.exports.userEnter = async (req, res) =>  {
  const {login, password} = req.body;
  const candidateLogin = await User.findOne({login: login});
  if (candidateLogin) {
    const CandidatePassword = bcrypt.compareSync(password, candidateLogin.password);
    if (CandidatePassword) {
      res.send(200).send('авторизация пройдена');
    } else {
      res.status(401).send({err: "Пароли не совпадают"});
    }
  } else {
    res.status(404).send({err: "User не найден"});
  };
};