import Router from "@koa/router";

export const router = new Router();

router.prefix("/user");

router.get("/list", (ctx, next) => {
  ctx.body = "用户列表";
})

router.post("/add", (ctx, next) => {
  ctx.body = "添加到用户";
})

export default router