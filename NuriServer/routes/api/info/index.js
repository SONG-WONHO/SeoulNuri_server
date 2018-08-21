const express = require('express');
const router = express.Router();
const tourRouter = require('./tour/index');
const lodgeRouter = require('./lodge/index');

router.use('/lodge',lodgeRouter);
router.use('/tour',tourRouter);

module.exports = router;
