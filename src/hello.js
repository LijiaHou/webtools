const Koa = requier('koa');
const app = new Koa();

app.use(ctx => {
  ctx.body = 'Hello Koa';
});

app.listen(3000);