import Koa from 'koa'
import userRouter5 from "../router/learn/user5"
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import session from 'koa-session'


/**
 * 登录接口     登录成功后，得到用户信息
 * 退出登录接口 如果退出登录，则无法得到用户信息
 * 
 * 有些接口需要登录才能访问，这就是鉴权
 */

const app = new Koa();

app.use(bodyParser());

app.keys = ['some secret hurr']

const SESSION_CONFIG = {
  key: 'koa.sess',
  maxAge: 86400000,
  httpOnly: true, 
  signed: true, 
}

app.use(session(SESSION_CONFIG, app))

app.use(serve('public'))

app.use(userRouter5.routes())
  .use(userRouter5.allowedMethods());

app.listen(3000, () => {
  console.log("Koa Server is running on 3000")
})