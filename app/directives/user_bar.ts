/// <reference path='../../typings/all.d.ts' />
/// <amd-dependency path="text!../views/replaceable.html" />

import angular = require('angular');

var template = require('text!../views/replaceable.html');

export interface ILogInEvent {
    login:string;
    password: string;
}

export class UserBarController {

    public signup = false;

    public loginEvent: ILogInEvent = {
        login: '',
        password: ''
    };

    constructor (public $scope, public $element, public $attrs, $transclude) {

        $scope.vm_user = this;

    }

    public login() {
        this.$scope.$emit('login', this.loginEvent);
    }


}

export var userbar: ng.IDirectiveFactory = ()=>{
        return {
            restrict: 'E',
            transclude: true,
            template: template,
            link: (scope: any, iElement, iAttrs, controller)=>{
                console.log(scope, controller);
            },
            controller: UserBarController
        }
};