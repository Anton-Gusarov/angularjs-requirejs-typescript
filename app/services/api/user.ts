/// <reference path='../../../typings/all.d.ts' />
import angular = require('angular');

import iapi = require('api.i');

export class API_User implements iapi.IAPI {

    public apiURL;
    public user;

    constructor ($resource) {

        this.user = $resource(this.apiURL + '/user', {},
            {
                login: {
                    method: 'GET'
                },

                signup: {
                    method: 'POST'
                }
            });
    }

}