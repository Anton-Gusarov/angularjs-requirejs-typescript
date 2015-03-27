/// <reference path='../../typings/all.d.ts' />
import angular = require("angular");

export interface IItemsList {
    id: number;
    title: string;
    link: string;
    image: string;
}

export class API {

    public items: any;

    constructor ($resource) {
        this.items = $resource('http://localhost:3001/api/items', {},
            {
                getItems: {
                    method: 'GET',
                    isArray: true,
                    cache: true
                }
            });
    }

}

export var services = angular.module('services', ['ngResource'])
    .service('API', API);
