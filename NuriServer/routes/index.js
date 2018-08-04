var express = require('express');
var router = express.Router();

const apiRouter = require('./api/index');

router.use('/', apiRouter);
module.exports = router;
