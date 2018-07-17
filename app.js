const Koa = require('koa');

const cors = require('koa-cors')
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const serve = require("koa-static");
const compress = require('koa-compress');

const { logger, catchWrong, resHeader } = require('./server/middleware/index') // middleware
const router = require('./server/router/index'); // router

const app = new Koa();

app.keys=['this is my secret'];  // cookie session 加密

const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};



const options = { threshold: 2048 }; // resouce > 2048kb
app.use(compress(options)); // gzip

app.use(logger); // logger middleware
app.use(resHeader); // add response header

app.use(serve(__dirname + '/static'));

app.use(cors({ 
    origin: 'http://127.0.0.1:8080', // 前端的域名、协议、端口
    credentials: true,  // 前端跨域请求携带cookie  前端设置 xhr.withCredentials = true
})) 

app.use(bodyParser()); // 解析请求体

app.use(session(CONFIG, app)); //   ctx.session[key] = value  设置cookie/session

app.use(catchWrong);
app.use(router.routes()).use(router.allowedMethods()) // 网络请求

app.listen(3000, () => {
    console.log('server start')
})