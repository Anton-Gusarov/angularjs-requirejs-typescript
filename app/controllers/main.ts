/// <reference path='../../typings/all.d.ts' />

import angular = require("angular");
import services = require("../services/services");

export interface IMainControllerScope extends ng.IScope {

    items: services.IItemsList[];
    $scope: IMainControllerScope;
    vm: MainController;
    loading: boolean;
    adminMode: boolean;

}

export class MainController {

    public static $inject = ['$scope', 'API', 'admin'];
    public loading: boolean = false;
    public mallsSelected = [];

    constructor (private $scope: IMainControllerScope, private API: services.API, private adminMode: boolean) {

        $scope.items = [];

        $scope.vm = this;
        $scope.adminMode = this.adminMode;

        if (adminMode) {
            this.loadAll();
        }
    }

    private loadMore () {
        var $scope = this.$scope,
            controller = this;
        this.loading = true;

        this.API.items.getItems({
            length:10,
            start: this.$scope.items.length
        }, (data: services.IItemsList)=>{
            $scope.items = $scope.items.concat(data);
            controller.loading = false;
        });
    }

    public loadAll () {
        var $scope = this.$scope,
            controller = this;
        this.loading = true;

        this.API.items.getItems({
            length:1000,
            start: 0
        }, (data: services.IItemsList)=>{
            $scope.items = $scope.items.concat(data);
            controller.loading = false;
        });
    }

    public select (index: number) {
        var $scope = this.$scope;
        $scope.items[index].selected = !$scope.items[index].selected;
    }

    public save () {
        var sentItems = [],
            model = this,
            items = this.$scope.items.filter((item)=>{
                if (item.selected) {
                    sentItems.push({
                        id: item.id,
                        malls: model.mallsSelected
                    });
                    return true;
                }
                return false;
            });

        this.API.items.saveItems(sentItems, (result)=>{
            if (result.Result === 'OK') {
                model.$scope.$broadcast('items.saved');
            }
        });

    }

}
