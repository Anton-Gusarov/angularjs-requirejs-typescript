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
    private itemsPerPage = 10;
    public emptyResults = false;

    constructor (private $scope: IMainControllerScope, private API: services.API, private adminMode: boolean) {

        $scope.items = [];

        $scope.vm = this;
        $scope.adminMode = this.adminMode;

        if (adminMode) {
            this.loadAll();
        }
    }

    public changeMall (malls) {
        var $scope = this.$scope,
            controller = this;

        this.getItems({}, (data)=>{
            $scope.items = data;
        });
    }

    private getItems (options, callback?: Function) {
        var controller = this;
        if (this.loading) return;
        this.loading = true;
        options.useFilters = true;

        this.API.items.getItems({
            length: options.length || this.itemsPerPage,
            start: options.start || 0,
            malls: this.mallsSelected.length ? this.mallsSelected.map((mall)=>{return mall.Mall_ID}) : []
        }, (data: services.IItemsList[])=>{
            controller.loading = false;
            this.emptyResults = !data.length;
            callback(data);
        });
    }

    public loadMore () {
        var $scope = this.$scope,
            controller = this;

        if ($scope.items.length > 0 && $scope.items.length < this.itemsPerPage) return;
        if (this.emptyResults) return;

        this.getItems({
            start: this.$scope.items.length
        }, (data)=>{
            $scope.items = $scope.items.concat(data);
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

    public select (item: services.IItemsList, $event) {
        var siblingSelectedIndex, $index = item.$index, inc = -1;
        item.selected = !item.selected;

        if ($event.shiftKey) {
            siblingSelectedIndex = this.closestSelected(item);
            if (siblingSelectedIndex > $index) inc = 1;
            for (var i = $index; inc === 1 ? i < siblingSelectedIndex : i > siblingSelectedIndex; i += inc) {
                this.$scope.items[i].selected = true;
            }
        }
    }

    public closestSelected (item: services.IItemsList): number {
        var $scope = this.$scope,
            model = this,
            items = $scope.items,
            $index = item.$index, resultIndex, diff = Number.POSITIVE_INFINITY;

        items.forEach((item)=>{
            if (item.selected && item.$index !== $index && (diff > Math.abs($index - item.$index))) {
                resultIndex = item.$index;
                diff = Math.abs($index - resultIndex);
            }
        });

        return resultIndex || -1;
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
