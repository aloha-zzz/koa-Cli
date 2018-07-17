module.exports = async (ctx, next) => {
    await next()
    ctx.set('X-Powered-By', 'zhou-cli') // 设置响应头
}