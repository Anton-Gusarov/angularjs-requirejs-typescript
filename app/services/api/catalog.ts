/// <reference path='../../../typings/all.d.ts' />
import angular = require('angular');

import iapi = require('api.i');

export class API_Catalog implements iapi.IAPI {

    public apiURL;
    public items;
    public malls;

    constructor ($resource) {

        var apiURL = this.apiURL;

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