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

    constructor (private $scope: IMainControllerScope, private API: services.API, private adminMode: boolean) {

        $scope.items = [];

        $scope.vm = this;
        $scope.adminMode = this.adminMode;
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

    public select (index: number) {
        var $scope = this.$scope;
        $scope.items[index].selected = !$scope.items[index].selected;
    }

}
