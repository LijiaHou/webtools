import Koa from 'koa'
import userRouter from "../router/user"

const app = new Koa();

// get传参的两种方式
app.use(userRouter.routes())
  .use(userRouter.allowedMethods());


app.listen(3000, () => {
  console.log("Koa Server is running on 3000")
})