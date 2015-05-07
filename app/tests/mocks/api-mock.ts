/// <reference path='../../../typings/all.d.ts' />
import services = require('../../services/services');
export class API implements services.IAPI {
    public items: any = new APIItemsMock();
    public malls: any;

    constructor () {
        this.items.parent = this;
    }

}

export interface IAPIRequest {
    options: IItemsOptions;
    response?: any;
}

export class APIRequest implements IAPIRequest {


    constructor (public options: IItemsOptions, public response?:any) {

    }

    public setResponse (response) {
        this.response = response;
    }
}

export class APIItemsMock {

    public requests: IAPIRequest[] = [];


    public getItems (options: IItemsOptions, callback?: Function) {

        // there no any dependency injection is possible
        var request = new APIRequest(options);
        this.requests.push(request);
        setTimeout(()=>{
            callback(request.response);
        }, 10);
    }

    public clearRequests () {
        this.requests = [];
    }



}