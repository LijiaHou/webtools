import Koa from 'koa'

const app = new Koa();

/**
 * koa的中间件机制
 * 
 * 洋葱模型
 * 
*/

app.use(async (ctx, next) => {
  console.log('1');
  await next();
  console.log('5');
})

app.use(async (ctx, next) => {
  console.log('2');
  await next();
  console.log('4');
})

app.use(async (ctx, next) => {
  console.log('3');
  ctx.body = "hello koa";
})

app.listen(3000);