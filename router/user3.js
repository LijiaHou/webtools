import Router from "@koa/router";

export const router = new Router();

router.prefix("/user");

router.get("/list", (ctx, next) => {

  // 给客户端种植一个cookie
  // 后面浏览器每一次请求服务器，都会自动带着cookie
  // 当会话结束，cookie就死了

  // ctx.cookies.set("username", "wangcai")

  // 设置cookies存活7天
  ctx.cookies.set("username", "xiaoxin", {
    maxAge: 1000 * 60 * 60 * 24 * 7
  })

  console.log('获取cookie', ctx.cookies.get('username'))

  ctx.body = "用户列表";
})

router.post("/add", (ctx, next) => {
  ctx.body = "添加到用户";
})

export default router