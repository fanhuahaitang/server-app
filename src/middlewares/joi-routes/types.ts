import { Spec } from "koa-joi-router";

enum APIType {
    Status = "服务器状态API",
    Info = "服务器信息API",
    Data = "服务器数据API" //TODO: 拆分数据
}

const APITypes = [
    {
        name: APIType.Status,
        description: '用来访问操作服务器状态的API',
    },
    {
        name: APIType.Info,
        description: '用来访问操作服务器信息的API',
    },
    {
        name: APIType.Data,
        description: '用来访问操作服务器数据的API',
    }
    //TODO: 拆分数据
] as { name: APIType, description: string }[];

interface DocMetaSpec extends Spec {
    meta: {
        swagger: {
            summary: string,
            description: string,
            tags: APIType[]
        }
    }
}

export {
    DocMetaSpec, APIType, APITypes
}