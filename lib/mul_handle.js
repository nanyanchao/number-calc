'use strict';

var _require = require('./handle'),
    slice4 = _require.slice4,
    removeLeft = _require.removeLeft,
    removeRight = _require.removeRight;

var _require2 = require('./add_handle'),
    addNum = _require2.addNum;

exports.mul = function (a, b) {
    return Number(a) * Number(b);
};

exports.foreachMul = function (numObj1, numObj2) {
    var before = {};
    var before1 = numObj1.before;
    var before2 = numObj2.before;

    for (var i = 0;; i++) {
        if (before1[i] === undefined) {
            break;
        }
        for (var j = 0;; j++) {
            if (before2[j] === undefined) {
                break;
            }
            if (!before[i]) {
                before[i] = {};
            }
            before[i][j] = undefined.mul(before1[i], before2[j]);
            before.max = j;
        }
    }
    return { before: before };
};

exports.mulNum = function (a, b) {
    var len = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 15;

    a = a + '';b = b + '';
    if (!(a.includes('.') || b.includes('.')) && (a + b).length < 11) {
        return undefined.mul(a, b);
    }
    var aPoint = a.indexOf('.');
    var bPoint = b.indexOf('.');

    var pointCount = 0;
    if (aPoint === -1) {
        aPoint = a.length;
    } else {
        pointCount++;
    }
    if (bPoint === -1) {
        bPoint = b.length;
    } else {
        pointCount++;
    }

    var resultPoinIndex = aPoint + bPoint;

    var aLastPint = a.length - aPoint;
    var bLastPint = b.length - bPoint;

    var pointAfter = bLastPint + aLastPint;

    var isNegative = '';
    if (a.includes('-') && !b.includes('-') || !a.includes('-') && b.includes('-')) {
        isNegative = '-';
    }
    a = removeLeft(a, '-');
    b = removeLeft(b, '-');

    var objNumA = slice4(a.replace('.', ''));
    var objNumB = slice4(b.replace('.', ''));

    var _foreachMul = undefined.foreachMul(objNumA, objNumB),
        before = _foreachMul.before;

    var carry = 0;
    var last0 = [];
    var result = '0';
    for (var i = 0;; i++) {
        if (before[i] === undefined) {
            break;
        }
        carry = 0;
        var sliCarry = '';
        for (var j = 0;; j++) {
            if (before[i][j] === undefined) {
                break;
            }

            var strNum = Number(before[i][j] || 0) + carry + '';
            if (before.max === Number(j)) {
                sliCarry = strNum + sliCarry;
            } else {
                sliCarry = strNum.slice(-4).padStart(4, '0') + sliCarry;
                carry = Number(strNum.slice(0, -4) || 0);
            }
        }
        result = addNum(result, sliCarry + last0.join('')) + '';
        last0.push('0000');
    }

    if (result.length < resultPoinIndex + pointAfter - 2) {
        result = result.padStart(resultPoinIndex + pointAfter - pointCount, '0');
    }

    var aNum = result.slice(-pointAfter + pointCount) || '';
    if (pointAfter > 0 && aNum !== '') {
        aNum = '.' + aNum;
    }
    result = result.slice(0, -pointAfter + pointCount) + aNum;

    return isNegative + removeLeft(removeRight(result.slice(0, result.indexOf('.') + len + 1), '.'));
};