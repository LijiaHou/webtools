import Koa from 'koa'

const app = new Koa();

app.use(async (ctx, next) => {
  try {
    await next();
    // 注意这里catch了err，就不会触发全局的处理了
  } catch (error) {
    console.log('error 被catch到了', error);
    ctx.status = 501;
    ctx.type = "json";
    ctx.body = {
      ok: 0,
      message: error.message
    }
  }
})

app.use(async (ctx, next) => {
  console.log('抛出错误');
  throw new Error('未知错误');
})

// 全局错误处理，后台打印
app.on("error", err => {
  console.log('全局错误处理' , err)
})


app.listen(3000, () => {
  console.log('Koa Server is running on 3000')
});