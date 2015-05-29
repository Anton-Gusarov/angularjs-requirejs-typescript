/// <reference path='../../typings/all.d.ts' />
import angular = require('angular');

import _catalog = require('./api/catalog');

export interface IItems {
    id: number;
    title: string;
    link: string;
    image: string;
    selected: boolean;
    detailedInfo: boolean;
    malls: number[];
    colors: number[];
    sizes: number[];
    $index?: number;
}

export interface IAPI {
    user: any;
}

export class API implements _catalog.API_Catalog, IAPI {

    public user: any;
    public items: any;
    public malls: any;


    public apiURL = '';

    public $inject = ['$resource', '$location'];

    constructor ($resource, $location) {
        var l = $location;
        this.apiURL = l.protocol() + '://' + l.host() + (l.port() ? ':' + l.port() : '') + '/api';

        _catalog.API_Catalog.call(this, $resource);

        this.user = $resource(this.apiURL + '/user', {},
            {
                getMalls: {
                    method: 'GET',
                    isArray: true
                }
            });
    }

}

applyMixins(API, [_catalog.API_Catalog]);

export function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        })
    });
}

export var services = angular.module('services', ['ngResource'])
    .service('API', API);
