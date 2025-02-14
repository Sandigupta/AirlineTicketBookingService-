const express = require('express');
const app = express();
const router=require('Router')

const v1ApiRotes=require('./v1/index') //Here we get all the api routes thet are used in v1/index.js routes.

router.use('/v1', v1ApiRotes);

module.exports = router;

