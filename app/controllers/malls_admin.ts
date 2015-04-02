/// <reference path='../../typings/all.d.ts' />

import angular = require("angular");
import services = require("../services/services");

export class MallsController {

    public static $inject = ['$scope', 'API'];
    public loading: boolean = false;
    public selectedMalls: Array<any> = [];

    constructor (private $scope, private API: services.API) {
        $scope.malls = [];
        $scope.vm = this;
        $scope.$watch('vm.selectedMalls', (newValue, oldValue)=>{
            $scope.value = newValue;
        });
    }

    public getMalls () {
        var $scope = this.$scope,
            controller = this;
        this.loading = true;

        this.API.malls.getMalls({}, (data)=>{
            $scope.malls = $scope.malls.concat(data);
            controller.loading = false;
        });
    }

}
