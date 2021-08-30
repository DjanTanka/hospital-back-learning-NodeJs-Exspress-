const bcrypt = require('bcryptjs');
const User = require('../../db/models/user/index');
const Role = require('../../db/models/role/index');
const jwt = require('jsonwebtoken')
const userService = require('../../service/user-service');
const { validationResult } = require('express-validator') // здесь получаем результат валидации от того что прописали в роутах
const ApiError = require("../../ecxeptions/api-error")


module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers()
    return res.json({data: users})
  } catch (e) {

  }
  
};

module.exports.registration = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Ошибка валидации", errors.array()))
    }
    const {email, password} = req.body;
    const userData = await userService.registration(email, password);
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
    console.log('---userData', userData)
    return res.json(userData)
  } catch (e) {
    next(e) //??? не понимаю как отрабатывает здесь  этот next
  };
};

module.exports.login = async (req, res, next) =>  {
  try {
    const {email, password} = req.body;
    const userData = await userService.login (email, password);
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
    return res.json(userData)
  } catch (e) {
    next(e)
  } 
};

module.exports.logout = async (req, res, next) =>  {
  try {
    const { refreshToken } = req.cookies;
    const token = await userService.logout(refreshToken)
    res.clearCookie('refreshToken')
    return res.json(token)
  } catch (e) {
    next(e)
  } 
};

module.exports.activate = async (req, res, next) =>  {
  try {
    const activationLink = req.params.link;
    await userService.activate(activationLink);
    return res.redirect(process.env.CLIENT_URL);
  } catch (e) {
    next(e)
  } 
};

module.exports.refresh = async (req, res) =>  {
  try {
    const { refreshToken } = req.cookies;
    const userData = await userService.refresh(refreshToken)
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
    return res.json(userData)
  } catch (e) {
    console.log('---e', e)
  } 
};