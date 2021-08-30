const jwt = require('jsonwebtoken')
const ApiError = require('../ecxeptions/api-error');
const tokenService = require('../service/token-service');

module.exports = async (req, res, next) => {
  try {
    const accessHeader = req.headers.authorization;
    if (!accessHeader) {
     return next(ApiError.UnauthorizedError()) // почему нельзя написать просто ApiError.UnauthorizedError() 
    } else {
    const accessToken = req.headers.authorization.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError()) 
    } 
    const userData = await tokenService.validateAccessToken(accessToken);
    console.log('---userData', userData)
    if (!userData) {
      return next(ApiError.UnauthorizedError()) 
    }
    req.user = userData;
    next()
    }
  } catch (e) {
    return next(ApiError.UnauthorizedError()) 
  }
}