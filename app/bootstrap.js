define(["require", "exports", 'angular', "app"], function (require, exports, ng) {
    requirejs(['domReady!'], function (document) {
        ng.bootstrap(document, ['app']);
    });
});
//# sourceMappingURL=bootstrap.js.map