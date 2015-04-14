/// <reference path='../../typings/all.d.ts' />
/// <amd-dependency path="text!./dummy/items.dummy.json" />
define(["require", "exports", '../controllers/main', "./mocks/api-mock", "text!./dummy/items.dummy.json"], function (require, exports, main_controller, services) {
    var items = JSON.parse(require('text!./dummy/items.dummy.json'));
    var eventMock = {
        shiftKey: true
    };
    describe('main controller logic', function () {
        var $scope, api, controller;
        beforeEach(function () {
            $scope = {
                items: [],
                vm: controller,
                loading: false,
                adminMode: false,
                $broadcast: function () {
                }
            };
            api = new services.API;
            controller = new main_controller.MainController($scope, api, false);
        });
        it('select 3 item with shift key', function () {
            var selected = [];
            controller.$scope.items = items;
            controller.$scope.items[1].selected = true;
            controller.select(controller.$scope.items[3], eventMock);
            selected = controller.$scope.items.filter(function (item) {
                return item.selected;
            });
            expect(selected.length).toBe(3);
        });
    });
});
//# sourceMappingURL=main-controller-test.js.map