/// <reference path='typings/all.d.ts' />
var _ = require('lodash');
var API = (function () {
    function API() {
        this.defaultItemsLength = 10;
    }
    API.prototype.setConnection = function (connection) {
        this.connection = connection;
    };
    API.prototype.getItems = function (callback, options) {
        var options = options || {}, limit = " LIMIT " + (options.length || this.defaultItemsLength) + " OFFSET " + (options.start || 0), where = [], whereString = '', joinString = '';
        if (options.type)
            where.push("Items.type='" + options.type + "'");
        if (options.gender)
            where.push("Items.gender='" + options.gender + "'");
        if (options.malls && options.malls.length) {
            where.push("Items.`id`=rel.`Item_ID` AND rel.`Mall_ID` IN (" + options.malls.join(", ") + ")");
        }
        if (where.length)
            whereString = " WHERE " + where.join(" AND ");
        this.connection.query("SELECT DISTINCT Items.* FROM `Items`, `ItemsMalls_Relation` AS rel" + whereString + limit, this.callback.bind(this, callback || (function () {
        })));
    };
    API.prototype.saveItems_Malls = function (data, callback) {
        var _this = this;
        var insert_query = [], api = this, callback = callback || (function () {
        }), items_ids = _.map(data, function (item) {
            item.malls.forEach(function (mall) {
                insert_query.push("(" + item.id + ", " + mall.Mall_ID + ")");
            });
            return Number(item.id);
        }), query = "DELETE FROM `ItemsMalls_Relation` WHERE Item_ID IN (" + items_ids.join(", ") + ")";
        if (!items_ids.length) {
            callback();
        }
        this.connection.query(query, function (err) {
            if (!insert_query.length) {
                api.callback.bind(_this, callback, err);
                return;
            }
            // INSERT operation
            api.connection.query("INSERT INTO `ItemsMalls_Relation` VALUES " + insert_query.join(", "), api.callback.bind(_this, callback));
        });
    };
    API.prototype.callback = function (callback, err, row) {
        if (err) {
            console.error(err);
            return;
        }
        callback(row);
    };
    /**
     * Designed for saturating the database by a data
     * @param data
     * @param callback
     */
    API.prototype.saturateTemp = function (data, callback) {
        var _this = this;
        var query = "INSERT INTO Items_t (id, image) VALUES ", updates = [];
        data.forEach(function (item) {
            updates.push("(" + item.id + ", " + _this.connection.escape(item.to) + ")");
        });
        this.connection.query(query + updates.join(", "), this.callback.bind(this, callback || (function () {
        })));
    };
    API.prototype.getMalls = function (callback, options) {
        var options = options || {}, limit = options.length ? " LIMIT " + options.length + " OFFSET " + (options.start || 0) : "";
        this.connection.query("SELECT * FROM `Malls`" + limit, this.callback.bind(this, callback || (function () {
        })));
    };
    return API;
})();
exports.API = API;
//# sourceMappingURL=db.js.map