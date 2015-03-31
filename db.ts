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
        this.connection.query("SELECT * FROM `Items`" + whereString + limit, this.callback.bind(this, callback || (()=>{})));
    }

    public callback (callback: Function, err: mysql.IError, row: any) {
        if (err) {
            console.error(err);
            return;
        }

        callback(row);
    }

    public saturateTemp (data: Array<any>, callback) {
        var query = "INSERT INTO Items_t (id, image) VALUES ",
            updates = [];
        data.forEach((item)=>{
            updates.push("(" + item.id + ", " + this.connection.escape(item.to) + ")");
        });
        this.connection.query(query + updates.join(", "), this.callback.bind(this, callback || (()=>{})));
    }

    public getMalls (callback?: Function, options?: IItemsOptions) {
        var options: IItemsOptions = options || {},
            limit = options.length ? " LIMIT " + options.length + " OFFSET " + (options.start || 0) : "";
        this.connection.query("SELECT * FROM `Malls`" + limit, this.callback.bind(this, callback || (()=>{})));
    }

}
