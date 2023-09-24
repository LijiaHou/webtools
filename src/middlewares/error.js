
// 错误集中处理，需要放在app.use的最上层

const _ =  async (ctx, next) => {
  try {
    console.log('有请求');
    await next();
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = error.message;
    ctx.app.emit("error", error, ctx)
  }
}

export default _