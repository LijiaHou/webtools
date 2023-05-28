import Router from "@koa/router";

// 创建一个路由器对象
export const router = new Router();

router.get("/", (ctx, next) => {
  ctx.body = "欢迎访问webtools首页";
})

export default router