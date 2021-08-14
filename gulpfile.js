const { src, watch, dest } = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

exports.default = defaultTask = exports.tsc = function tsc() {
    return src('src/**')
        .pipe(tsProject())
        .pipe(dest('dist/'));
};

exports.auto = function auto() {
    return watch('src/**', { ignoreInitial: false, delay: 5000 }, defaultTask)
}