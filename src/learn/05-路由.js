import Koa from 'koa'
import indexRouter from "../router/learn/index"
import userRouter from "../router/learn/user"

const app = new Koa();


app.use(indexRouter.routes())
  .use(indexRouter.allowedMethods());


app.use(userRouter.routes())
  .use(userRouter.allowedMethods());


app.listen(3000, () => {
  console.log("Koa Server is running on 3000")
})