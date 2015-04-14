/// <reference path="node-uuid.d.ts" />
var uuid = require('node-uuid');
var uid1 = uuid.v1();
var uid2 = uuid.v2();
var uid3 = uuid.v3();
var uid4 = uuid.v4();
var options = {
    node: [],
    clockseq: 2,
    nsecs: 3,
    msecs: new Date()
};
var padding = [0, 1, 2];
var offset = 15;
var buf = [];
uuid.parse(uid4, buf, offset);
uuid.unparse(buf, offset);
uuid.v1(options, padding, offset);
uuid.v2(options, padding, offset);
uuid.v3(options, padding, offset);
uuid.v4(options, padding, offset);
//# sourceMappingURL=node-uuid-tests.js.map