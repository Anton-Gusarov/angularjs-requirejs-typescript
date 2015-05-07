/// <reference path='../../typings/all.d.ts' />
/// <amd-dependency path="text!./dummy/items.dummy.json" />
/// <amd-dependency path="_" />

import main_controller = require('../controllers/main');
import services = require("./mocks/api-mock");
var items = JSON.parse(require('text!./dummy/items.dummy.json'));

var eventMock = {

    shiftKey: true

};

describe('main controller', ()=>{

    var $scope: main_controller.IMainControllerScope,
        api: services.API,
        controller: main_controller.MainController;

    var ITEMS_PER_PAGE = 10,
        START_POSITION = 0;

    beforeEach(()=>{

        $scope = {
            items: [],
            vm: controller,
            loading: false,
            adminMode: false,
            $broadcast: ()=>{}
        };
        api = new services.API;
        controller = new main_controller.MainController($scope, api, false);
        api.items.clearRequests();


    });

    it('select 3 item with shift key', ()=>{
        var selected = [];
        controller.$scope.items = items;
        controller.$scope.items[1].selected = true;

        controller.select(controller.$scope.items[3], eventMock);

        selected = controller.$scope.items.filter((item)=>{
            return item.selected;
        });

        expect(selected.length).toBe(3);
    });

    it('should request default number of items only on the first', ()=>{
        var requests = controller.API.items.requests;
        controller.getItems({});

        expect(requests[requests.length - 1].options.length).toEqual(ITEMS_PER_PAGE);
        expect(requests[requests.length - 1].options.start).toEqual(START_POSITION);
    });

    it('must prevent other requests until initiated one finishes', ()=>{
        var requests = controller.API.items.requests;
        controller.getItems({});
        controller.getItems({});
        expect(requests.length).toEqual(1);
    });

    it('can start another request after first one finishes', ()=>{
        var requests = controller.API.items.requests,
            loading = true;
        runs(()=>{
            controller.getItems({}, ()=>loading = false);
            controller.getItems({}, ()=>loading = false);
            expect(loading).toBe(true);
            expect(requests.length).toEqual(1);
        });
        waitsFor(()=>{
            return !loading;
        }, 'there no any response', 50);


        runs(()=>{
            expect(loading).toBe(false);

            controller.getItems({});
            expect(requests.length).toEqual(2);
        });

    });

    it('loads more items on loadMore call', ()=>{
        var requests = controller.API.items.requests,
            request;
        controller.loadMore();
        request = requests[0];
        request.setResponse(_.range(ITEMS_PER_PAGE));

        waitsFor(()=>controller.$scope.items.length > 0, '', 50);

        runs(()=>{
            expect(controller.$scope.items.length).toEqual(ITEMS_PER_PAGE);
        });
        runs(()=>{
            controller.loadMore();
            request = requests[1];
            request.setResponse(_.range(ITEMS_PER_PAGE));
        });

        waitsFor(()=>controller.$scope.items.length > ITEMS_PER_PAGE, '', 50);

        runs(()=>{
            expect(controller.$scope.items.length).toEqual(2*ITEMS_PER_PAGE);
        });

    });
});