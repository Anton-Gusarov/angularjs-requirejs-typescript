/// <reference path='../../typings/all.d.ts' />

import angular = require("angular");
import services = require("../services/services");

export interface IUserControllerScope {

    vm_user: UserController;
    $broadcast: Function;
    $on: Function;
}

export class UserController {

    public static $inject = ['$scope', 'API'];

    constructor (public $scope: IUserControllerScope, public API: services.IAPI) {

        $scope.vm_user = this;
        $scope.$on('login', (event)=>{

        });

    }

    public switchForm(type:string) {

    }

}
