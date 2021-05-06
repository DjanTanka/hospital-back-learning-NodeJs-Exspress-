const express = require('express');
const router = express.Router();
//for Users of Appoint
const {
  getAllUsers,
  addNewUser,
  userEnter,
} = require('../controllers/user.controllers');

router.get('/getAllUsers', getAllUsers);
router.post('/addNewUser', addNewUser);
router.post('/userEnter', userEnter);

//for Users of Appoint
const {
  getAllAppoints,
  addNewAppoint,
  // editAppoint,
  // deleteAppoint
} = require('../controllers/appoint.controllers');

router.get('/getAllAppoints', getAllAppoints);
router.post('/addNewAppoint', addNewAppoint);
// router.put('/editAppoint', editAppoint);
// router.delete('/deleteAppoint', deleteAppoint);

module.exports = router;