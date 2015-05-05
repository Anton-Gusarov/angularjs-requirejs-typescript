/// <reference path='../../typings/all.d.ts' />
import angular = require("angular");
import sidebarDirective = require("./sidebar");
import malls_admin = require("./malls_selector_admin");
import malls = require("./malls_selector");
import product = require("./product");
import product_detailed = require("./product_detailed");
export var directives = angular.module('directives', [])
    .directive('sidebar', sidebarDirective.sidebar)
    .directive('mallsadmin', malls_admin.mallsAdmin)
    .directive('product', product.product)
    .directive('productDetailed', product_detailed.productDetailed)
    .directive('malls', malls.malls);
