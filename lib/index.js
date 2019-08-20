'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _require = require('./add_handle'),
    addNum = _require.addNum;

var _require2 = require('./div_handle'),
    divNum = _require2.divNum;

var _require3 = require('./mul_handle'),
    mulNum = _require3.mulNum;

var _require4 = require('./sub_handle'),
    subNum = _require4.subNum;

exports.default = {
    //addition
    add: function add(a, b, len) {
        return addNum(a, b, len);
    },
    //subtraction
    sub: function sub(a, b, len) {
        return subNum(a, b, len);
    },
    //multiplication
    mul: function mul(a, b, len) {
        return mulNum(a, b, len);
    },
    //division
    div: function div(a, b, len) {
        return divNum(a, b, len);
    }
};