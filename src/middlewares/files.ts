import serve from "koa-static";

const filesMiddleware = serve('./static');

export default filesMiddleware;