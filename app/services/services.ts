/// <reference path='../../typings/all.d.ts' />
import angular = require("angular");

export interface IItemsList {
    id: number;
    title: string;
    link: string;
    image: string;
    selected: boolean;
    malls: number[];
    colors: number[];
    sizes: number[];
}

export class API {

    public items: any;
    public malls: any;

    constructor ($resource) {
        this.items = $resource('http://localhost:8081/api/items', {},
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
        this.malls = $resource('http://localhost:8081/api/malls', {},
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
