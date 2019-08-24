'use strict';

var _require = require('./add_handle'),
    addNum = _require.addNum;

var sub = function sub(a, b) {
    return Number(a) - Number(b) + '';
};
exports.sub = sub;
exports.subNum = function (a, b) {
    a = a + '';
    b = b + '';
    if (!(a.includes('.') || b.includes('.')) && (a + b).length < 11) {
        return sub(a, b) + '';
    }
    if (b.includes('-')) {
        return addNum(a, b.replace('-', ''));
    } else {
        return addNum(a, "-" + b);
    }
};