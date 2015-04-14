/// <reference path='../../typings/all.d.ts' />
/// <amd-dependency path="text!./dummy/items.dummy.json" />

import main_controller = require('../controllers/main');
import services = require("./mocks/api-mock");
var items = JSON.parse(require('text!./dummy/items.dummy.json'));

var eventMock = {

    shiftKey: true

};

describe('main controller logic', ()=>{

    var $scope: main_controller.IMainControllerScope,
        api: services.API,
        controller: main_controller.MainController;

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
});