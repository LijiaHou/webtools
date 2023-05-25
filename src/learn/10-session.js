import Koa from 'koa'
import userRouter4 from "../router/user4"
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import session from 'koa-session'

/**
 * session
 * 当浏览器第一次访问服务器时，服务器生成一个sid，并将其以cookie的形式种植在浏览器
 * 浏览器后面再次访问服务器时，会带上sid的cookie
 * 服务器去验证sid的合法性
*/

const app = new Koa();

app.use(bodyParser());

//  加密签名
app.keys = ['some secret hurr']

// Session的配置
const SESSION_CONFIG = {
  key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000, /** 有效期，默认是一天 */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
}

app.use(session(SESSION_CONFIG, app))

app.use(ctx => {
  // ignore favicon
  if (ctx.path === '/favicon.ico') return;

  let n = ctx.session.views || 0;
  ctx.session.views = ++n;
  ctx.body = n + ' views';
});


app.use(serve('public'))

app.use(userRouter4.routes())
  .use(userRouter4.allowedMethods());

app.listen(3000, () => {
  console.log("Koa Server is running on 3000")
})