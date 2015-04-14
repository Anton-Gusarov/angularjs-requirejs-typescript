/// <reference path='../../typings/all.d.ts' />

import angular = require("angular");
import services = require("../services/services");

export class MallsController {

    public static $inject = ['$scope', 'API', '$timeout'];
    public loading: boolean = false;
    public selectedMalls: Array<IMall> = [];

    constructor (private $scope, private API: services.API, $timeout: ng.ITimeoutService) {
        $scope.malls = [];
        $scope.vm = this;
        $scope.$watchCollection('vm.selectedMalls', (newValue, oldValue)=>{
            if (newValue === oldValue) { return; }
            $scope.value = newValue ? (newValue instanceof Array ? newValue : [newValue]) : [];
            // Calls change attribute of the directive Malls
            $timeout($scope.change.bind($scope), 0);
        }, true);
    }

    public getMalls () {
        var $scope = this.$scope,
            controller = this;
        //TODO: make abort of the previous xhr and start the new one
        this.loading = true;

        this.API.malls.getMalls({}, (data)=>{
            $scope.malls = $scope.malls.concat(data);
            controller.loading = false;
        });
    }

}
