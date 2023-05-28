import Koa from 'koa'
import userRouter3 from "../router/learn/user3"
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'

/**
 * cookie和session都是用来记录数据的
 *    cookie是存储在浏览器中，由服务器种植
 *    session是存储在服务器中
 * 
 * 
*/

const app = new Koa();

app.use(bodyParser());

app.use(serve('public'))

app.use(userRouter3.routes())
  .use(userRouter3.allowedMethods());

app.listen(3000, () => {
  console.log("Koa Server is running on 3000")
})