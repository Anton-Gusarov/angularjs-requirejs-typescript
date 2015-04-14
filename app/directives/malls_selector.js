/// <reference path='../../typings/all.d.ts' />
/// <amd-dependency path="text!../views/malls_selector.html" />
define(["require", "exports", "text!../views/malls_selector.html"], function (require, exports) {
    var template = require('text!../views/malls_selector.html');
    exports.malls = function () {
        return {
            restrict: 'E',
            scope: {
                'value': '=',
                'change': '&'
            },
            template: template,
            // Same controller for the two directives which do the same thing but appear differently.
            controller: 'controllers.malls-admin'
        };
    };
});
//# sourceMappingURL=malls_selector.js.map