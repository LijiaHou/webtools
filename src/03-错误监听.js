import Koa from 'koa'

const app = new Koa();

/**
 * 
 * 
*/

app.use(async (ctx, next) => {
  throw new Error('未知错误');
})


app.listen(3000);