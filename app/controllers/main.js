/// <reference path='../../typings/all.d.ts' />
define(["require", "exports"], function (require, exports) {
    var MainController = (function () {
        function MainController($scope, API, adminMode) {
            this.$scope = $scope;
            this.API = API;
            this.adminMode = adminMode;
            this.loading = false;
            this.mallsSelected = [];
            $scope.items = [];
            $scope.vm = this;
            $scope.adminMode = this.adminMode;
            if (adminMode) {
                this.loadAll();
            }
        }
        MainController.prototype.loadMore = function () {
            var $scope = this.$scope, controller = this;
            this.loading = true;
            this.API.items.getItems({
                length: 10,
                start: this.$scope.items.length
            }, function (data) {
                $scope.items = $scope.items.concat(data);
                controller.loading = false;
            });
        };
        MainController.prototype.loadAll = function () {
            var $scope = this.$scope, controller = this;
            this.loading = true;
            this.API.items.getItems({
                length: 1000,
                start: 0
            }, function (data) {
                $scope.items = $scope.items.concat(data);
                controller.loading = false;
            });
        };
        MainController.prototype.select = function (index) {
            var $scope = this.$scope;
            $scope.items[index].selected = !$scope.items[index].selected;
        };
        MainController.prototype.save = function () {
            var sentItems = [], model = this, items = this.$scope.items.filter(function (item) {
                if (item.selected) {
                    sentItems.push({
                        id: item.id,
                        malls: model.mallsSelected
                    });
                    return true;
                }
                return false;
            });
            this.API.items.saveItems(sentItems, function (result) {
                if (result.Result === 'OK') {
                    model.$scope.$broadcast('items.saved');
                }
            });
        };
        MainController.$inject = ['$scope', 'API', 'admin'];
        return MainController;
    })();
    exports.MainController = MainController;
});
//# sourceMappingURL=main.js.map