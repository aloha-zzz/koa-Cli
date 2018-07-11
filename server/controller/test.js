const { query } = require('./../util/mysql');

async function test(ctx) {
    let req = ctx.request.body;
    let user = ctx.session.user;  // 与cookie session 相关;
    // await query(`select * from user`); // sql 查询操作是async;
    ctx.body = {
        code: 0,
        body: 'content'
    }
}


module.exports = {
    test,
}