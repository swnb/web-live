const Koa = require('koa');
const body = require('koa-body');
const util = require('util');
const router = require('koa-router')();
const static = require('koa-static');
const app = new Koa();
const fs = require('fs');
router.get('/', async ctx => {
    ctx.status = 200;
    ctx.set('content-type', 'text/html');
    ctx.body = fs.createReadStream('./src/views/index.html');
});
router.post('/data', body(), async ctx => {
    console.log(this.request.body); // if buffer or text
    console.log(this.request.files); // if multipart or urlencoded
    console.log(this.request.fields); // if json

    ctx.status = 204;
});
app.use(static('./src'));
app.use(router.routes()).listen(8080);
