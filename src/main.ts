import Koa from "koa";
import { Context, Next } from "koa";
import corsMiddleware from "./middlewares/CORS"
import uploadFilesMiddleware from "./middlewares/upload";
import apiMiddlewares from "./middlewares/api";
import filesMiddleware from "./middlewares/files";

const app = new Koa();
const port = 8080;

app.use(async (ctx: Context, next: Next) => {
    ctx.assert(ctx.request.accepts('json'), 406);
    await next();
});
app.use(corsMiddleware);
app.use(uploadFilesMiddleware);
app.use(apiMiddlewares);
app.use(filesMiddleware);

app.listen(port, () => {
    console.info(`HTTP server is running on port ${port}`);
});