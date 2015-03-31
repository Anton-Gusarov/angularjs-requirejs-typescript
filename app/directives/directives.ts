/// <reference path='../../typings/all.d.ts' />
import angular = require("angular");
import sidebarDirective = require("./sidebar");
import malls_admin = require("./malls_selector_admin");
export var directives = angular.module('directives', [])
    .directive('sidebar', sidebarDirective.sidebar)
    .directive('mallsadmin', malls_admin.mallsAdmin);
