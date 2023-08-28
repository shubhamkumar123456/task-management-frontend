const express = require('express');
const { createUser, loginUser, getUser } = require('../controllers/auth');
const fetchuser = require('../middleware/fetchUser');
const router = express.Router();



router.post('/create',createUser);
router.post('/login',loginUser);
router.get('/getUser',fetchuser,getUser)

module.exports = router;