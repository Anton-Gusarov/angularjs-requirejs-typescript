/// <reference path='../../../typings/all.d.ts' />
import services = require('../../services/services');
import reqres = require('./reqres-mock');



export class API implements services.IAPI {
    public items: any = new APIItemsMock(true);
    public malls: any;

    constructor () {
        this.items.parent = this;
    }

}

export interface IAPIRequest extends reqres.IRequest {
    options: IItemsOptions;
}

export class APIRequest extends reqres.Request implements IAPIRequest {


    constructor (public options: IItemsOptions, public response?:any, callback?: Function) {
        super(response, callback);
    }
}

export class APIItemsMock extends reqres.ReqRes {

    public requests: IAPIRequest[] = [];


    public getItems (options: IItemsOptions, callback?: Function) {

        return this.request(new APIRequest(options), callback);
    }



}