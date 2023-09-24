import Koa from 'koa'
import errHandler from './middlewares/error'
import bodyParser from 'koa-bodyparser';
import indexRouter from './router/index'
import mergeImageRouter from './router/mergeImage'
const serve = require('koa-static')
import Router from '@koa/router'
import {historyApiFallback} from 'koa2-connect-history-api-fallback'

export const port = 3010;
const app = new Koa();
const router = new Router();

app.use(errHandler);

app.use(async (ctx, next) => {
  await next()
  ctx.set('Cache-Control', 'max-age=10')
})

app.use(historyApiFallback())

app.use(serve(__dirname + '/build'))


// router.all('/login', (ctx) => {
//   ctx.url = '/index.html'
// })

// router.all('/login', '/')

// app.use(router.routes())
//   .use(router.allowedMethods());

// app.use(bodyParser(
//   ({
//     // 限制各种类型的请求体大小，超出返回413
//     formLimit: '50mb',  // 默认56k
//     jsonLimit: '50mb',  // 默认1mb
//     textLimit: '50mb',  // 默认1mb
//     enableTypes: ['json', 'form', 'text'],  // default is ['json', 'form']
//   })
// ));

// app.use(indexRouter.routes())
//   .use(indexRouter.allowedMethods());

// app.use(mergeImageRouter.routes())
//   .use(mergeImageRouter.allowedMethods());

app.listen(port, () => {
  console.log(`Koa Server is running on ${port}`)
});
