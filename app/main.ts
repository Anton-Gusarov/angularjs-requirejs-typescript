/// <reference path='../typings/all.d.ts' />

requirejs.config({
    paths: {
        'text': 'bower_components/requirejs-text/text',
        'domReady': 'bower_components/requirejs-domready/domReady',
        'angular': 'bower_components/angular/angular',
        //'angular-animate': '../lib/angularjs/angular-animate',
        'angular-route': 'bower_components/angular-route/angular-route',
        'angular-resource': 'bower_components/angular-resource/angular-resource',
        'ngInfiniteScroll': 'bower_components/ngInfiniteScroll/build/ng-infinite-scroll',
        'jquery': 'bower_components/jquery/dist/jquery',
        'bootstrap_l': 'bower_components/bootstrap/dist/js/bootstrap'
    },

    shim: {
        'bootstrap_l': {
            deps: ['jquery']
        },
        'angular': {
            exports: 'angular'
        },
        'angular-animate': {
            deps: ['angular'],
            exports: 'angular-animate'
        },
        'angular-route': {
            deps: ['angular'],
            exports: 'angular-route'
        },
        'angular-resource': {
            deps: ['angular'],
            exports: 'angular-resource'
        },
        'ngInfiniteScroll': {
            deps: ['angular']
        }
    },

    deps: [
        // kick start application... see bootstrap.js
        'bootstrap_l',
        './bootstrap'
    ]
});