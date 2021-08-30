const User= require('../db/models/user/index');
const uuid = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto')
const bcrypt = require('bcryptjs');
const ApiError = require('../ecxeptions/api-error')

class UserService {

  async registration (email, password) {
    const candidateLogin = await User.findOne({email: email});
    if (candidateLogin) {
      throw ApiError.BadRequest(`This email: ${email} exists already`);
    } else {
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({value: "USER"});
      const activationLink = uuid.v4() 
      const user = new User({
        email: email,
        password: hashPassword,
        roles: [userRole.value],
        activationLink
      });
      await user.save() 
      await mailService.sendActivationMail( email, `${process.env.API_URL}/activate/${activationLink}` );
      const userDto = new UserDto(user);
      const tokens = tokenService.ganerateTokens({...userDto});
      await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken) //сохраняем рефреш в бд привязанным к данному юзеру

      return {...tokens, user: userDto }
    }
  }

  async login (email, password) {
    const user = await User.findOne({email});
    
    if (user) {
      const isPassRight = bcrypt.compareSync(password, user.password);
      if (!isPassRight) {
        throw ApiError.BadRequest('Неверный пароль')
      }
      const userDto = new UserDto(user);
      const tokens = tokenService.ganerateTokens({...userDto});
      await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken) //сохраняем рефреш в бд привязанным к данному юзеру
     
      return {...tokens, user: userDto }
    } else {
      throw ApiError.BadRequest('Пользователь с таким email не зарегистрирован')
    }
  }

  async activate (activationLink) {
    const user = await User.findOne({activationLink})
    if (!user) {
      throw ApiError.BadRequest ('Некорректная ссылка активации')
    } else {
      user.isActivated = true;
      await user.save();
    }
  } 

  async logout (refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token;
  }

  async refresh (refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = await tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    } 
    const user = await User.findOne({_id: userData.id})
    const userDto = new UserDto(user);
    const tokens = tokenService.ganerateTokens({...userDto});
    await tokenService.saveRefreshToken(userDto.id, tokens.refreshToken) //сохраняем рефреш в бд привязанным к данному юзеру
     
    return {...tokens, user: userDto }
  }

  async getAllUsers () {
    const users = await User.find()
    return users
  }
}

module.exports = new UserService();