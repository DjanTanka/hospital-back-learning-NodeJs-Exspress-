const jwt = require('jsonwebtoken');
const TokenModel = require('../db/models/user/token')

class TokenService {
  ganerateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {expiresIn: '30m'})
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {expiresIn: '30d'})
    return {
      accessToken,
      refreshToken
    }
  }

  async saveRefreshToken (userId, refreshToken) { 
    const token = await TokenModel.findOne({user: userId})
    if (token) {
      token.refreshToken = refreshToken
      await token.save()
      return token
    } else {
      const token = new TokenModel({
        user: userId,
        refreshToken: refreshToken
      })
      await token.save()
      return token
    }
  }

  async removeToken (refreshToken) {
    const tokenData = await TokenModel.deleteOne({refreshToken});
 
    return tokenData
  }

  async findToken (refreshToken) {
    const tokenData = await TokenModel.findOne({refreshToken});
 
    return tokenData
  }

  
  async validateAccessToken (accessToken)  {
    try {
      const userData = jwt.verify(accessToken, process.env.JWT_ACCESS_KEY)
      return userData
    } catch (e) {
      return null
    }
  }


  async validateRefreshToken (refreshToken) {
    try {
      const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY)
      return userData
    } catch (e) {
      return null
    }
  }

}

module.exports = new TokenService();