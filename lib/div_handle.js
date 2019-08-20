'use strict';

var _require = require('./handle'),
    removeLeft = _require.removeLeft,
    removeRight = _require.removeRight;

var _require2 = require('./sub_handle'),
    subNum = _require2.subNum;

var sub = function sub(a, b) {
    if (Number(a) < Number(b)) {
        return { quotient: 0, remainder: a + '' };
    }
    var result = sub(subNum(a, b), b);
    return { quotient: result.quotient + 1, remainder: result.remainder };
};

var point = 0;
var div = function div(a, b, remainder, len, result) {
    if (len < 0) {
        return;
    }
    if (Number(b) === 0) {
        return 0;
    }
    if (result.length === 0) {
        point = 0;
    }
    var dividend = '';
    if (remainder.length < b.length) {
        dividend = remainder + (a.slice(0, 1) || '');
        if (a !== '') {
            a = a.slice(1);
            result.push("0");
        }
    } else {
        dividend = remainder;
    }

    var quotientRemainder = sub(dividend, b);
    result.push(quotientRemainder.quotient);

    if (!a && point === 0) {
        result.push('.');
        point = 1;
    }
    if (point === 1) {
        div(a.slice(1), b, quotientRemainder.remainder + (a.slice(0, 1) || '0'), len - 1, result);
    } else {
        div(a.slice(1), b, quotientRemainder.remainder + (a.slice(0, 1) || '0'), len, result);
    }
};

var removeRight0 = function removeRight0(a, b) {
    if (a.slice(-1) === b.slice(-1) && a.slice(-1) === '0') {
        return removeRight0(a.slice(0, -1), b.slice(0, -1));
    }
    return [a, b];
};

exports.divNum = function (a, b) {
    var len = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 15;

    a = a + '';b = b + '';
    var pointLastIndexOf = -1;
    var aArr = a.split('.');
    var aBefore = aArr[0];
    var aAfter = aArr[1] || '';
    var aLastIndexOf = aAfter.length;
    pointLastIndexOf = aLastIndexOf;

    var bArr = b.split('.');
    var bBefore = bArr[0];
    var bAfter = bArr[1] || '';

    var bLastIndexOf = bAfter.length;
    if (pointLastIndexOf < bLastIndexOf) {
        pointLastIndexOf = bLastIndexOf;
    }

    a = removeLeft(aBefore + aAfter.padEnd(pointLastIndexOf, '0'));
    b = removeLeft(bBefore + bAfter.padEnd(pointLastIndexOf, '0'));
    var ab = removeRight0(a, b);
    a = ab[0] || "0";
    b = ab[1] || "0";
    if (a === "0") {
        return "0";
    }
    if (b === "0") {
        return;
    }
    var isNegative = '';
    if (a.includes('-') && !b.includes('-') || !a.includes('-') && b.includes('-')) {
        isNegative = '-';
    }
    var result = [];
    a = removeLeft(a, '-');
    b = removeLeft(b, '-');
    div(a.slice(b.length), b, a.slice(0, b.length), len, result);
    return isNegative + removeLeft(removeRight(result.join(''), '.'));
};