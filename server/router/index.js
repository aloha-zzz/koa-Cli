const router = require('koa-router')();

const { test } = require('./../controller/test'); // controller

router.get('/test', test);

module.exports = router;