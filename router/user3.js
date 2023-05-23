import Router from "@koa/router";

export const router = new Router();

router.prefix("/user");

router.get("/list", (ctx, next) => {

  // 给客户端种植一个cookie
  // 后面浏览器每一次请求服务器，都带着cookie
  // 当会话结束，cookie就死了

  // ctx.cookies.set("username", "wangcai")
  ctx.cookies.set("username", "wangcai", {
    maxAge: 
  })

  ctx.body = "用户列表";
})

router.post("/add", (ctx, next) => {
  ctx.body = "添加到用户";
})

export default router