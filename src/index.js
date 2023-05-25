import Koa from 'koa'
import errHandler from './middlewares/error'

const port = 3000;
const app = new Koa();


app.use(errHandler)

app.use(ctx => {
  const a = 12/0;
  a.b();
  ctx.body = "太好了，终于可以开始做起来这个项目了"
})

app.listen(port, () => {
  console.log(`Koa Server is running on ${port}`)
})
