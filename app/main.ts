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
// Если ограничиться положительными числами, то массив можно отсортировать, и получить более быстрый алгоритм
var comb = (arr)=>{
    var length = arr.length,
        summand = 1,
        indexes = [],
        si, i, result = [];

    var summ = (indexes)=>{
        var res=0;
        for (var i = 0; i<indexes.length;i++) {
            res +=arr[indexes[i]];
        }
        return res;
    };

    var retrieve = (indexes)=>{
        var res = [];
        indexes.forEach((index)=>{
            res.push(arr[index]);
        });
        return res;
    };

    while (summand <= length) {

        indexes = [];

        for (si = 0; si <= summand; si++) {

            indexes.push(si);

        }

        if (summ(indexes) === 10) result.push(retrieve(indexes));

        for (si = 0; si <= summand; si++) {

            for (i = indexes.length; i<length;i++) {

                indexes[si] = i;
                if (summ(indexes) === 10) result.push(retrieve(indexes));

            }

            indexes[si] = si;
        }


        summand++;
    }

    return result;

}

var debounceSecN = (func, n)=>{
    var timeout, args, counter = 0, result;

    var later = function() {
        timeout = null;
        counter = 0;
        result = func.apply(null, args);
    };

    return function() {
        args = arguments;
        counter++;
        if (!timeout || counter <= n) {
            if (!timeout) timeout = setTimeout(later, 1000);
            result = func.apply(null, args);
        }

        return result;
    };
}