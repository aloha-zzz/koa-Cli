const Koa = require('koa');
const cors = require('koa-cors')
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const serve = require("koa-static");
const { logger, catchWrong } = require('./server/middleware/index') // middleware
const router = require('./server/router/index'); // router

const app = new Koa()

const options = { threshold: 2048 }; // resouce > 2048kb
app.use(compress(options)); // gzip

app.use(logger); // logger middleware

app.use(serve(__dirname))

app.use(catchWrong);
app.use(router.routes()).use(router.allowedMethods()) // 网络请求

app.listen(3000, () => {
    console.log('server start')
})