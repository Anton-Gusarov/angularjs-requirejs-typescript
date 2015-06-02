/// <reference path='../../typings/all.d.ts' />

import angular = require("angular");
import services = require("../services/services");

export interface IUserControllerScope {

    $on: Function;
    token: string;
}

export class UserController {

    public static $inject = ['$scope', 'API'];

    public token = '';

    constructor (public $scope: IUserControllerScope, public API: services.IAPI) {

        var user = this;
        $scope.$on('login', (event, loginData)=>{
            user.API.user.login(loginData,
            (data)=>{
                    if (data.ERROR) {
                        user.onerror(data.ERROR);
                        return;
                    }
                    user.API.setUserToken(data.Payload.token);
                });
        });

    }

    public onerror (error) {

    }

}
