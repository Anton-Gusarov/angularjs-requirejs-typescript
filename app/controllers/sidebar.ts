/// <reference path='../../typings/all.d.ts' />

import angular = require("angular");
import services = require("../services/services");

export interface ISidebarControllerScope extends ng.IScope {

    items: services.IItems[];
    $scope: ISidebarControllerScope;
    vm: SidebarController;
    loading: boolean;

}

export class SidebarController {

    public static $inject = ['$scope', 'API', '$routeProvider'];
    public loading: boolean = false;

    constructor (private $scope: ISidebarControllerScope, private API: services.API, private $routeProvider) {
    }

}
