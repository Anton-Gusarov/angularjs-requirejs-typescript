/// <reference path='../../../typings/all.d.ts' />

export interface IRequest {
    response?: any;
    callback?: Function;
}

export interface IReqRes {

    requests: IRequest[];
    request: (request: IRequest, callback?: Function)=>IRequest;
    clearRequests: Function;

}

export class Request implements IRequest {


    constructor (public response?:any, public callback?: Function) {

    }

    public setResponse (response) {
        this.response = response;
    }

    public respond (response?:any, callback?: Function) {
        if (response instanceof Function) callback = response;

        (callback || this.callback)(response || this.response);
    }
}

export class ReqRes implements IReqRes {

    public requests: IRequest[] = [];

    constructor (public async: boolean = false) {

    }

    public request (request: IRequest, callback?: Function) {

        var cb = ()=>{
                callback(request.response);
            };

        request.callback = cb;
        this.requests.push(request);
        if (this.async) {
            (window && setTimeout(cb, 10)) || (process && process.nextTick && process.nextTick(cb));
        }
        return request;
    }

    public clearRequests () {
        this.requests = [];
    }



}