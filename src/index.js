import Koa from 'koa'
import errHandler from './middlewares/error'
import bodyParser from 'koa-bodyparser';
import indexRouter from './router/index'
import mergeImageRouter from './router/mergeImage'

export const port = 3000;
const app = new Koa();


app.use(errHandler);

app.use(bodyParser(
  ({
    // 限制各种类型的请求体大小，超出返回413
    formLimit: '50mb',  // 默认56k
    jsonLimit: '50mb',  // 默认1mb
    textLimit: '50mb',  // 默认1mb
    enableTypes: ['json', 'form', 'text'],  // default is ['json', 'form']
  })
));

app.use(indexRouter.routes())
  .use(indexRouter.allowedMethods());

app.use(mergeImageRouter.routes())
  .use(mergeImageRouter.allowedMethods());

app.listen(port, () => {
  console.log(`Koa Server is running on ${port}`)
});
