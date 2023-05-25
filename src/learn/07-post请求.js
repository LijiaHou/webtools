import Koa from 'koa'
import userRouter2 from "../router/user2"
import bodyParser from 'koa-bodyparser'

const app = new Koa();

// 要想获取post的请求体，一定要安装这个包，不然无法直接获取body，
// 原生的可能要写一些监听函数
app.use(bodyParser());

// 等同于 app.use()
//        app.use()
// 因为app.use()返回this，是链式的
app.use(userRouter2.routes())
  .use(userRouter2.allowedMethods());


app.listen(3000, () => {
  console.log("Koa Server is running on 3000")
})