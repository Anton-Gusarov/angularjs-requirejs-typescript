/// <reference path='../../typings/all.d.ts' />
import angular = require('angular');

var apiURL;

export interface IItems {
    id: number;
    title: string;
    link: string;
    image: string;
    selected: boolean;
    malls: number[];
    colors: number[];
    sizes: number[];
    $index?: number;
}

export class API {

    public items: any;
    public malls: any;

    public $inject = ['$resource', '$location'];

    constructor ($resource, $location) {
        var l = $location;
        apiURL = l.protocol() + '://' + l.host() + (l.port() ? ':' + l.port() : '') + '/api';

        this.items = $resource(apiURL + '/items', {},
            {
                getItems: {
                    method: 'GET',
                    isArray: true,
                    cache: true
                },

                saveItems: {
                    method: 'POST'
                }
            });
        this.malls = $resource(apiURL + '/malls', {},
            {
                getMalls: {
                    method: 'GET',
                    isArray: true,
                    cache: true
                }
            });
    }

}

export var services = angular.module('services', ['ngResource'])
    .service('API', API);
