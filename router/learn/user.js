import Router from "@koa/router";

export const router = new Router();

/**
 * get传参的两种方式
 * 
 *  1）params传参   /user/1  /user/2
 *  2）query传参    /user?name=wc&age=18
 * 
 * */

router.get("/user/", (ctx, next) => {
  console.log('query传参', ctx.query);
  ctx.body = "用户列表";
})

router.get("/user/add/:id", (ctx, next) => {
  console.log('params传参', ctx.params.id);
  ctx.body = "增加用户";
})

export default router