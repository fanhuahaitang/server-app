import { APIType, DocMetaSpec } from "./types";
import { Joi } from "koa-joi-router";
import { APP_VERSION } from "../../app-version";

const routes = [
    {
        method: 'get',
        path: '/status',
        validate: {
            output: {
                200: {
                    body: Joi.object({
                        status: Joi.string()
                    })
                }
            }
        },
        handler: ctx => {
            ctx.body = { status: 'online' };
        },
        meta: {
            swagger: {
                summary: '服务器在线状态',
                description: '',
                tags: [APIType.Status]
            }
        }
    },
    {
        method: 'get',
        path: '/version',
        validate: {
            output: {
                200: {
                    body: Joi.object({
                        version: Joi.string()
                    })
                }
            },
        },
        handler: ctx => {
            ctx.body = { version: APP_VERSION };
        },
        meta: {
            swagger: {
                summary: '服务器版本信息',
                description: '',
                tags: [APIType.Info]
            }
        }
    }
    // TODO 添加API
] as DocMetaSpec[];

export default routes;