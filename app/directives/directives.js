define(["require", "exports", "angular", "./sidebar", "./malls_selector_admin", "./malls_selector"], function (require, exports, angular, sidebarDirective, malls_admin, malls) {
    exports.directives = angular.module('directives', []).directive('sidebar', sidebarDirective.sidebar).directive('mallsadmin', malls_admin.mallsAdmin).directive('malls', malls.malls);
});
//# sourceMappingURL=directives.js.map