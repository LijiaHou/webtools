import Koa from 'koa'
import userRouter2 from "../router/user2"
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'

const app = new Koa();

app.use(bodyParser());

console.log('__dirname', __dirname)

// 静态资源托管，将静态资源放在public文件夹下，可以直接被访问
app.use(serve('public'))

app.use(userRouter2.routes())
  .use(userRouter2.allowedMethods());


app.listen(3000, () => {
  console.log("Koa Server is running on 3000")
})