/// <reference path='../../typings/all.d.ts' />
/// <amd-dependency path="text!../views/sidebar.html" />
define(["require", "exports", "text!../views/sidebar.html"], function (require, exports) {
    var template = require('text!../views/sidebar.html');
    exports.sidebar = function () {
        return {
            restrict: 'E',
            transclude: true,
            template: template
        };
    };
});
//# sourceMappingURL=sidebar.js.map