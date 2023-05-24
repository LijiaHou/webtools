import Router from "@koa/router";

export const router = new Router();

// 当所有请求的前缀都是 /user 可以提出来
router.prefix("/user");

router.get('/', ctx => {
  ctx.redirect("list");
  ctx.status = 301;
})

router.get("/list", (ctx, next) => {
  ctx.body = "用户列表";
})

router.post("/add", (ctx, next) => {
  console.log('post的request', ctx.request.body);
  ctx.body = "添加到用户";
})

export default router