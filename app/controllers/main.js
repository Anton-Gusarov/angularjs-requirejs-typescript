/// <reference path='../../typings/all.d.ts' />
define(["require", "exports"], function (require, exports) {
    var MainController = (function () {
        function MainController($scope, API, adminMode) {
            this.$scope = $scope;
            this.API = API;
            this.adminMode = adminMode;
            this.loading = false;
            this.mallsSelected = [];
            this.itemsPerPage = 10;
            this.emptyResults = false;
            $scope.items = [];
            $scope.vm = this;
            $scope.adminMode = this.adminMode;
            if (adminMode) {
                this.loadAll();
            }
        }
        MainController.prototype.changeMall = function (malls) {
            var $scope = this.$scope, controller = this;
            this.getItems({}, function (data) {
                $scope.items = data;
            });
        };
        MainController.prototype.getItems = function (options, callback) {
            var _this = this;
            var controller = this;
            if (this.loading)
                return;
            this.loading = true;
            options.useFilters = true;
            this.API.items.getItems({
                length: options.length || this.itemsPerPage,
                start: options.start || 0,
                malls: this.mallsSelected.length ? this.mallsSelected.map(function (mall) {
                    return mall.Mall_ID;
                }) : []
            }, function (data) {
                controller.loading = false;
                _this.emptyResults = !data.length;
                callback(data);
            });
        };
        MainController.prototype.loadMore = function () {
            var $scope = this.$scope, controller = this;
            if ($scope.items.length > 0 && $scope.items.length < this.itemsPerPage)
                return;
            if (this.emptyResults)
                return;
            this.getItems({
                start: this.$scope.items.length
            }, function (data) {
                $scope.items = $scope.items.concat(data);
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
        MainController.prototype.select = function (item, $event) {
            var siblingSelectedIndex, $index = item.$index, inc = -1;
            item.selected = !item.selected;
            if ($event.shiftKey) {
                siblingSelectedIndex = this.closestSelected(item);
                if (siblingSelectedIndex > $index)
                    inc = 1;
                for (var i = $index; inc === 1 ? i < siblingSelectedIndex : i > siblingSelectedIndex; i += inc) {
                    this.$scope.items[i].selected = true;
                }
            }
        };
        MainController.prototype.closestSelected = function (item) {
            var $scope = this.$scope, model = this, items = $scope.items, $index = item.$index, resultIndex, diff = Number.POSITIVE_INFINITY;
            items.forEach(function (item) {
                if (item.selected && item.$index !== $index && (diff > Math.abs($index - item.$index))) {
                    resultIndex = item.$index;
                    diff = Math.abs($index - resultIndex);
                }
            });
            return resultIndex || -1;
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