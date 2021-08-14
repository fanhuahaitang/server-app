import { SwaggerAPI } from "koa-joi-router-docs";
import { APP_VERSION } from './app-version';
import createJoiRouter from "koa-joi-router";
import routes from "./middlewares/joi-routes";
import { APITypes } from "./middlewares/joi-routes/types";
import fs from "fs-plus";
import promisify from "util.promisify";

const APIDocInfo = {
    title: 'Server-App API Doc',
    description: '服务器应用程序的API文档',
    version: APP_VERSION
};

// const APIPrefixInfo = {
//     'user': '',

// }

(function writeAPIDocFiles() {
    console.info('API files are generating...');

    const docGenerator = new SwaggerAPI();
    const joiRouter = createJoiRouter();
    joiRouter.route(routes);
    docGenerator.addJoiRouter(joiRouter);

    // API files Content
    const APIJSONString = JSON.stringify(docGenerator.generateSpec({
        info: APIDocInfo,
        basePath: '/',
        tags: APITypes
    }), null, '  ');
    const APIHTMLofVersion = getSpecifiedVersonAPIHTML(APP_VERSION);
    const APIHTMLofLatest = getSpecifiedVersonAPIHTML('latest');

    // Write API files
    const writeFile = promisify(fs.writeFile);
    return Promise.all([
        writeFile(`static/api_v${APP_VERSION}.json`, APIJSONString),
        writeFile(`static/api_latest.json`, APIJSONString),
        writeFile(`static/api_v${APP_VERSION}.html`, APIHTMLofVersion),
        writeFile(`static/api_latest.html`, APIHTMLofLatest)
    ]);
})().then(() => {
    console.info('API files have been generated');
}).catch(console.error);

function getSpecifiedVersonAPIHTML(version: string = 'latest') {
    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${APIDocInfo.title}</title>
    <meta name="description" content="${APIDocInfo.description}">
</head>
<body>
    <redoc spec-url='./api_${version === 'latest' ? version : 'v' + version}.json' lazy-rendering></redoc>
    <script src="https://cdn.jsdelivr.net/npm/redoc@next/bundles/redoc.standalone.js"></script>
</body>
</html>`
}