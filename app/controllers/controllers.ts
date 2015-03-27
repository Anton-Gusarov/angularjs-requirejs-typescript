/// <reference path='../../typings/all.d.ts' />
import angular = require("angular");
import mainController = require("./main");
export var controllers = angular.module('controllers', ['ngResource', 'infinite-scroll'])
    .controller('MainCtrl', mainController.MainController);