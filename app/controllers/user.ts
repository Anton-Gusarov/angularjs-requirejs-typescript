/// <reference path='../../typings/all.d.ts' />

import angular = require("angular");
import services = require("../services/services");

export interface IUserControllerScope {

    vm_user: UserController;
    adminMode: boolean;
    $broadcast: Function;

}

export class UserController {

    public static $inject = ['$scope', 'API', 'admin'];

    public forms = {
    };

    constructor (public $scope: IUserControllerScope, public API: services.IAPI, private adminMode: boolean) {

        $scope.vm_user = this;
        $scope.adminMode = this.adminMode;

    }

    public switchForm(type:string) {

    }

}
