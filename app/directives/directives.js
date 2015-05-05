define(["require", "exports", "angular", "./sidebar", "./malls_selector_admin", "./malls_selector", "./product", "./product_detailed"], function (require, exports, angular, sidebarDirective, malls_admin, malls, product, product_detailed) {
    exports.directives = angular.module('directives', []).directive('sidebar', sidebarDirective.sidebar).directive('mallsadmin', malls_admin.mallsAdmin).directive('product', product.product).directive('productDetailed', product_detailed.productDetailed).directive('malls', malls.malls);
});
//# sourceMappingURL=directives.js.map