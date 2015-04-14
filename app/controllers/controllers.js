define(["require", "exports", "angular", "./main", "./sidebar", "./malls_admin"], function (require, exports, angular, mainController, sidebarController, mallsAdminController) {
    exports.controllers = angular.module('controllers', ['ngResource', 'infinite-scroll', 'ngRoute']).controller('controllers.main', mainController.MainController).controller('controllers.malls-admin', mallsAdminController.MallsController).controller('controllers.sidebar', sidebarController.SidebarController);
});
//# sourceMappingURL=controllers.js.map