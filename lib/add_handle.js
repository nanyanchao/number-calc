'use strict';

var _require = require('./handle'),
    slice4 = _require.slice4,
    removeLeft = _require.removeLeft;

var add = function add(a, b) {
    return Number(a) + Number(b) + '';
};
exports.add = add;

var foreachAdd = function foreachAdd(numObj1, numObj2) {
    var result = {};

    if (numObj1.max < numObj2.max) {
        for (var i in numObj2) {
            if (i !== 'max') {
                if (numObj2.max === Number(i)) {
                    var sum = add(numObj1[i] || '0', numObj2[i]);
                    if (sum < 0) {
                        result[i] = '-' + (Math.abs(sum) + '').padStart(numObj2[i].length, '0');
                    } else {
                        result[i] = (sum + '').padStart(numObj2[i].length, '0');
                    }
                } else {
                    result[i] = add(numObj1[i] || '0', numObj2[i]);
                }
            } else {
                result.max = numObj2.max;
            }
        }
    } else {
        for (var _i in numObj1) {
            if (_i !== 'max') {
                if (numObj1.max === Number(_i)) {
                    var _sum = add(numObj1[_i], numObj2[_i] || '0');
                    if (_sum < 0) {
                        result[_i] = '-' + (Math.abs(_sum) + '').padStart(numObj1[_i].length, '0');
                    } else {
                        result[_i] = (_sum + '').padStart(numObj1[_i].length, '0');
                    }
                } else {
                    result[_i] = add(numObj1[_i], numObj2[_i] || '0');
                }
            } else {
                result.max = numObj1.max;
            }
        }
    }
    return result;
};
exports.foreachAdd = foreachAdd;

var addNum = function addNum(a, b) {
    var len = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 15;

    a = a + '';b = b + '';
    if (!(a.includes('.') || b.includes('.')) && (a + b).length < 11) {
        return add(a, b);
    }
    var pointLastIndexOf = -1;
    var aBefore = a;
    var aAfter = "";
    if (a.includes('.')) {
        var aLastIndexOf = a.length - a.indexOf('.') - 1;
        pointLastIndexOf = aLastIndexOf;
        aBefore = a.slice(0, -aLastIndexOf - 1);
        aAfter = a.slice(-aLastIndexOf);
    }

    var bBefore = b;
    var bAfter = "";
    if (b.includes('.')) {
        var bLastIndexOf = b.length - b.indexOf('.') - 1;
        if (pointLastIndexOf < bLastIndexOf) {
            pointLastIndexOf = bLastIndexOf;
        }
        bBefore = b.slice(0, -bLastIndexOf - 1);
        bAfter = b.slice(-bLastIndexOf);
    }
    a = aBefore + aAfter.padEnd(pointLastIndexOf, '0');
    b = bBefore + bAfter.padEnd(pointLastIndexOf, '0');

    var isNegative = '';
    if (a.includes('-') && b.includes('-')) {
        a = a.replace('-', '');
        b = b.replace('-', '');
        isNegative = '-';
    }

    var objNumA = slice4(a);
    var objNumB = slice4(b);

    var before = foreachAdd(objNumA.before, objNumB.before);
    var beforeP = '';
    var carry = 0;
    var maxNum = Number(before[before.max]);
    console.log(before);
    for (var i = 0; i < before.max; i++) {
        var sli4 = Number(before[i]);
        sli4 = sli4 + carry;
        carry = 0;
        if (maxNum < 0 && sli4 > 0) {
            carry = 1;
            sli4 = 10000 - sli4;
        }

        if (sli4 > 9999) {
            var strSli4 = sli4 + '';
            carry = Number(strSli4.slice(0, 1));
            beforeP = strSli4.slice(1) + beforeP;
        } else {

            var _strSli = sli4 + '';
            if (_strSli.includes('-')) {
                isNegative = '-';
                if (before[before.max] > 0) {
                    _strSli = 10000 + +_strSli + '';
                    carry = -1;
                }
            }
            if (i != before.max) {
                beforeP = _strSli.replace('-', '').padStart(4, '0') + beforeP;
            } else {
                beforeP = _strSli + beforeP;
            }
        }
    }
    // maxNum
    var maxNumStr = maxNum + carry + '';
    if (before.max === 0) {
        maxNumStr = Math.abs(maxNum + carry) + '';
        maxNumStr = (Number(maxNum) < 0 ? '-' : '') + maxNumStr.padStart(4, '0');
    }
    beforeP = maxNumStr + beforeP;
    if (beforeP.length > pointLastIndexOf) {
        var pointIndex = beforeP.length - pointLastIndexOf;
        var reusltBefore = beforeP.slice(0, pointIndex);
        var reusltAfter = beforeP.slice(pointIndex);
        if (reusltBefore.includes('-')) {
            isNegative = '-';
            reusltBefore = reusltBefore.replace('-', '');
        }
        reusltBefore = removeLeft(reusltBefore);
        if (before[before.max] > 0) {
            return (reusltBefore || '0') + (reusltAfter ? "." : '') + reusltAfter.slice(0, len);
        }
        return isNegative + (reusltBefore || '0') + (reusltAfter ? "." : '') + reusltAfter.slice(0, len);
    } else {
        return isNegative + '0.' + beforeP.padStart(pointLastIndexOf, '0').slice(0, len);
    }
};

exports.addNum = addNum;