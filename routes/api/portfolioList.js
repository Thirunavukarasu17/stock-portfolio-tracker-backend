const express = require('express');
const router = express.Router();
const portfolioCtrl = require('../../controllers/api/portfolioList');
const ensureLoggedIn = require("../../config/ensureLoggedIn");


router.post('/', ensureLoggedIn, portfolioCtrl.create);
router.get('/', ensureLoggedIn, portfolioCtrl.show);
router.post('/add-stock', ensureLoggedIn, portfolioCtrl.addStock);
router.post('/del-stock', ensureLoggedIn, portfolioCtrl.delStock);

module.exports = router;