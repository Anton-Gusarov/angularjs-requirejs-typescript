/// <reference path='../../typings/all.d.ts' />
/// <amd-dependency path="text!../views/malls_selector_admin.html" />
define(["require", "exports", "text!../views/malls_selector_admin.html"], function (require, exports) {
    var template = require('text!../views/malls_selector_admin.html');
    exports.mallsAdmin = function () {
        return {
            restrict: 'E',
            scope: {
                'value': '='
            },
            template: template,
            // Same controller for the two directives which do the same thing but appear differently.
            controller: 'controllers.malls-admin'
        };
    };
});
//# sourceMappingURL=malls_selector_admin.js.map