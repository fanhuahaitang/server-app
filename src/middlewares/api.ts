import createJoiRouter from "koa-joi-router";
import routes from "./joi-routes";

const joiRouter = createJoiRouter();

joiRouter.route(routes);

const apiMiddlewares = joiRouter.middleware();

export default apiMiddlewares;