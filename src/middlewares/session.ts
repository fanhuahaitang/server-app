import Session from "koa-session";
import Koa from "koa";

const sessionMiddleware = app: Koa=> {
    return Session({}, app);
}