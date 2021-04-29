const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  addNewUser,
  userEnter,
} = require('../controllers/user.controllers');

router.get('/getAllUsers', getAllUsers);
router.post('/addNewUser', addNewUser);
router.post('/userEnter', userEnter);

module.exports = router;