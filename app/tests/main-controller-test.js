/// <reference path='../../typings/all.d.ts' />
/// <amd-dependency path="text!./dummy/items.dummy.json" />
/// <amd-dependency path="_" />
define(["require", "exports", '../controllers/main', "./mocks/api-mock", "text!./dummy/items.dummy.json", "_"], function (require, exports, main_controller, services) {
    var items = JSON.parse(require('text!./dummy/items.dummy.json'));
    var eventMock = {
        shiftKey: true
    };
    describe('main controller', function () {
        var $scope, api, controller;
        var ITEMS_PER_PAGE = 10, START_POSITION = 0;
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
            api.items.clearRequests();
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
        it('should request default number of items only on the first', function () {
            var requests = controller.API.items.requests;
            controller.getItems({});
            expect(requests[requests.length - 1].options.length).toEqual(ITEMS_PER_PAGE);
            expect(requests[requests.length - 1].options.start).toEqual(START_POSITION);
        });
        it('must prevent other requests until initiated one finishes', function () {
            var requests = controller.API.items.requests;
            controller.getItems({});
            controller.getItems({});
            expect(requests.length).toEqual(1);
        });
        it('can start another request after first one finishes', function () {
            var requests = controller.API.items.requests, loading = true;
            runs(function () {
                controller.getItems({}, function () { return loading = false; });
                controller.getItems({}, function () { return loading = false; });
                expect(loading).toBe(true);
                expect(requests.length).toEqual(1);
            });
            waitsFor(function () {
                return !loading;
            }, 'there no any response', 50);
            runs(function () {
                expect(loading).toBe(false);
                controller.getItems({});
                expect(requests.length).toEqual(2);
            });
        });
        it('loads more items on loadMore call', function () {
            var requests = controller.API.items.requests, request;
            controller.loadMore();
            request = requests[0];
            request.setResponse(_.range(ITEMS_PER_PAGE));
            waitsFor(function () { return controller.$scope.items.length > 0; }, '', 50);
            runs(function () {
                expect(controller.$scope.items.length).toEqual(ITEMS_PER_PAGE);
            });
            runs(function () {
                controller.loadMore();
                request = requests[1];
                request.setResponse(_.range(ITEMS_PER_PAGE));
            });
            waitsFor(function () { return controller.$scope.items.length > ITEMS_PER_PAGE; }, '', 50);
            runs(function () {
                expect(controller.$scope.items.length).toEqual(2 * ITEMS_PER_PAGE);
            });
        });
    });
});
//# sourceMappingURL=main-controller-test.js.map