/// <reference path='../../typings/all.d.ts' />

import angular = require("angular");
import services = require("../services/services");

export interface IMainControllerScope extends ng.IScope {

    items: services.IItemsList[];
    $scope: IMainControllerScope;
    vm: MainController;
    loading: boolean;

}

export class MainController {

    public static $inject = ['$scope', 'API'];
    public loading: boolean = false;

    constructor (private $scope: IMainControllerScope, private API: services.API) {

        /*$scope.items = this.API.items.getItems({
            length:10
        });*/
        $scope.items = [];

        $scope.vm = this;
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

}
