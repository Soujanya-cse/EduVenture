// const express = require('express');
// const router = express.Router();
// const { getProfile, updateProfile } = require('../Controllers/ProfileController');
// const ensureAuthenticated = require('../Middlewares/Auth');

// router.get('/me', ensureAuthenticated, getProfile);
// router.put('/me', ensureAuthenticated, updateProfile);

// module.exports = router;
const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, updateScore,  markGameStarted } = require('../Controllers/ProfileController'); // Add updateScore
const ensureAuthenticated = require('../Middlewares/Auth');

router.get('/me', ensureAuthenticated, getProfile);
router.put('/me', ensureAuthenticated, updateProfile);
router.post('/updateScore', ensureAuthenticated, updateScore); // Add this route
router.post('/markGameStarted', ensureAuthenticated, markGameStarted);

module.exports = router;