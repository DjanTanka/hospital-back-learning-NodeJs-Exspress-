const jwt = require('jsonwebtoken')
const { keyForJWT } = require('../../.env')
module.exports = (req, res, next) => {
  
  if (req.method === "OPTIONS") {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.status(403).json({message: "User Not Authurization" })
    }
    const decodedData = jwt.verify(token, keyForJWT);
    if (decodedData.role === "ADMIN") {
      next();
    } else {
      res.status(403).json({message: "У вас недостаточно прав" })
    }
    
  } catch (e) {
    console.log('---e', e)
    res.status(403).json({message: "User Not Authurization" })
  }
}