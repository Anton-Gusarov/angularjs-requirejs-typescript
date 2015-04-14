/// <reference path='../../typings/all.d.ts' />

import angular = require("angular");
import services = require("../services/services");

export interface IMainControllerScope extends ng.IScope {

    items: services.IItems[];
    $scope: IMainControllerScope;
    vm: MainController;
    loading: boolean;
    adminMode: boolean;

}

export interface IGetItemsCallback {(data:services.IItems[]): any}

export class MainController {

    public static $inject = ['$scope', 'API', 'admin'];
    public loading: boolean = false;
    public mallsSelected: IMall[] = [];
    private itemsPerPage = 10;
    // Necessary for infinite scroll to prevent unwanted requests
    public emptyResults: boolean = false;

    constructor (private $scope: IMainControllerScope, private API: services.API, private adminMode: boolean) {

        $scope.items = [];

        $scope.vm = this;
        $scope.adminMode = this.adminMode;

        if (adminMode) {
            this.loadAll();
        }
    }

    /**
     * Gets items as the user selects mall. Acquired in main.html.
     */
    public changeMall () {
        var $scope = this.$scope;

        this.getItems({}, (data)=>{
            $scope.items = data;
        });
    }

    private getItems (options: IItemsOptions, callback?: IGetItemsCallback) {
        var controller = this;
        // TODO: make abort of xhr and perform new one
        if (this.loading) return;
        this.loading = true;

        this.API.items.getItems({

            length: options.length || this.itemsPerPage,
            start: options.start || 0,
            malls: this.mallsSelected.length ? this.mallsSelected.map((mall)=>{return mall.Mall_ID}) : []

        }, (data: services.IItems[])=>{
            // TODO: attach error handling
            controller.loading = false;
            this.emptyResults = !data.length;
            callback && callback(data);
        });
    }

    /**
     * Loads more Items from the infinite scroll call.
     */
    public loadMore () {
        var $scope = this.$scope;

        // Prevent infinite scroll to make xhr calls when the amount of an items is too small
        if ($scope.items.length > 0 && $scope.items.length < this.itemsPerPage) return;
        // Same prevention but when the last result of getItems is empty
        if (this.emptyResults) return;

        this.getItems({
            start: this.$scope.items.length
        }, (data: services.IItems[])=>{
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
        }, (data: services.IItems)=>{
            $scope.items = $scope.items.concat(data);
            controller.loading = false;
        });
    }

    /**
     * Items can be selected in admin mode for edition purposes.
     * With shift key items are selected within the interval for the multiple edition.
     * Used in main.html
     * @param item
     * @param $event
     */
    public select (item: services.IItems, $event) {
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

    /**
     * Finds closest selected Item to the passed one. Necessary to estimate an interval for a multiple selection.
     * @param item
     * @returns {number}
     */
    public closestSelected (item: services.IItems): number {
        var $scope = this.$scope,
            items = $scope.items,
            $index = item.$index, resultIndex: number = -1, diff = Number.POSITIVE_INFINITY;

        items.forEach((item)=>{
            if (item.selected && item.$index !== $index && (diff > Math.abs($index - item.$index))) {
                resultIndex = item.$index;
                diff = Math.abs($index - resultIndex);
            }
        });

        return resultIndex;
    }

    /**
     * Saves selected Items. For now it saves chosen malls only.
     */
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
