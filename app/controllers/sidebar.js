/// <reference path='../../typings/all.d.ts' />
define(["require", "exports"], function (require, exports) {
    var SidebarController = (function () {
        function SidebarController($scope, API, $routeProvider) {
            this.$scope = $scope;
            this.API = API;
            this.$routeProvider = $routeProvider;
            this.loading = false;
        }
        SidebarController.$inject = ['$scope', 'API', '$routeProvider'];
        return SidebarController;
    })();
    exports.SidebarController = SidebarController;
});
//# sourceMappingURL=sidebar.js.map