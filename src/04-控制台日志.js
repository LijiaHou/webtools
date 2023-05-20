import Koa from 'koa'
import KoaLogger from 'koa-logger'

const app = new Koa();


app.use(KoaLogger());

app.use((ctx) => {
  ctx.body = "测试控制台日志";
})

app.listen(3000, () => {
  console.log("Koa Server is running on 3000")
})