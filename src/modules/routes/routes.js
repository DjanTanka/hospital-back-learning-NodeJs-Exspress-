const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware');
const roleMiddleware = require('../../middleware/roleMiddleware');
const { body } = require('express-validator') //для валидации тела запроса

//for Users of hospital
const {
  getAllUsers,
  registration,
  login,
  logout,
  activate,
  refresh,
} = require('../controllers/user.controllers');

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({min: 6, max: 10}),
  registration
);
router.post('/login', login);
router.post('/logout', logout);
router.get('/activate/:link', activate);
router.get('/refresh', refresh);
router.get('/getAllUsers', authMiddleware, getAllUsers);


//for Appoint
const {
  getAllAppoints,
  addNewAppoint,
  editAppoint,
  deleteAppoint
} = require('../controllers/appoint.controllers');

router.get('/getAllAppoints', getAllAppoints);
router.post('/addNewAppoint', addNewAppoint);
router.put('/editAppoint', editAppoint);
router.delete('/deleteAppoint', deleteAppoint);

module.exports = router;