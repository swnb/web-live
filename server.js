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
router.post('/data', body({ multipart: true }), async ctx => {
    fs.writeFile('./body.log', JSON.stringify(ctx.request.body), err =>
        console.log(err)
    );
    fs.writeFile('./files.log', ctx.request.files, err => console.log(err));
    fs.writeFile('./fields.log', ctx.request.fields, err => console.log(err));
    ctx.status = 204;
});
app.use(static('./src'));
app.use(router.routes()).listen(8080);
