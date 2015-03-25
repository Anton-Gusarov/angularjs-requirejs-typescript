/// <reference path='typings/all.d.ts' />

import mysql = require("mysql");

export interface IItemsOptions {
    length?: number;
    type?: string;
    gender?: string;
    start?: number;
}

export class API {

    public connection: mysql.IPool;
    private defaultLength = 30;

    constructor () {

    }

    public setConnection (connection: mysql.IPool) {
        this.connection = connection;
    }

    public getItems (callback?: Function, options?: IItemsOptions) {
        var options: IItemsOptions = options || {},
            limit = " LIMIT " + (options.length || this.defaultLength) + " OFFSET " + (options.start || 0),
            where = [], whereString = "";

        if (options.type) where.push("type='" + options.type + "'");
        if (options.gender) where.push("gender='" + options.gender + "'");

        if (where.length) whereString = " WHERE " + where.join(" AND ");
        this.connection.query("SELECT * FROM `Items`" + whereString + limit, this.onGetItems.bind(this, callback || (()=>{})));
    }

    public onGetItems (callback: Function, err: mysql.IError, row: any) {
        if (err) {
            console.error(err);
            return;
        }

        callback(row);
    }

}
