/// <reference path='../typings/all.d.ts' />
/// <amd-dependency path="app">
import app = require("app");

import ng = require("angular");

requirejs(['domReady!'], function (document) {
    ng.bootstrap(document, ['app']);
});
