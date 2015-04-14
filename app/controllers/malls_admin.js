/// <reference path='../../typings/all.d.ts' />
define(["require", "exports"], function (require, exports) {
    var MallsController = (function () {
        function MallsController($scope, API, $timeout) {
            this.$scope = $scope;
            this.API = API;
            this.loading = false;
            this.selectedMalls = [];
            $scope.malls = [];
            $scope.vm = this;
            $scope.$watchCollection('vm.selectedMalls', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }
                $scope.value = newValue ? (newValue instanceof Array ? newValue : [newValue]) : [];
                // Calls change attribute of the directive Malls
                $timeout($scope.change.bind($scope), 0);
            }, true);
        }
        MallsController.prototype.getMalls = function () {
            var $scope = this.$scope, controller = this;
            //TODO: make abort of the previous xhr and start the new one
            this.loading = true;
            this.API.malls.getMalls({}, function (data) {
                $scope.malls = $scope.malls.concat(data);
                controller.loading = false;
            });
        };
        MallsController.$inject = ['$scope', 'API', '$timeout'];
        return MallsController;
    })();
    exports.MallsController = MallsController;
});
//# sourceMappingURL=malls_admin.js.map