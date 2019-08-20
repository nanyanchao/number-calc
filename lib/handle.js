'use strict';

exports.slice4 = function (num) {
    var issub = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (num == '') {
        return;
    }
    var isNegative = '';
    if (num.includes('-')) {
        isNegative = '-';
        num = num.replace('-', '');
    }

    var arrNum = num.split('.');
    var before = {};
    var after = {};
    var beforePoint = arrNum[0] || '';
    var afterPoint = arrNum[1] || '';

    if (issub) {
        for (var i = beforePoint.length, j = 0; i > 0; i = i - 4, j++) {
            var sIndex = i - 4;
            before[j] = isNegative + beforePoint.slice(sIndex > 0 ? sIndex : 0, i);
            before.max = j;
        }
        for (var _i = 0, _j = 0; _i < afterPoint.length; _i = _i + 4, _j++) {
            after[_j] = isNegative + afterPoint.slice(_i, _i + 4).padEnd(4, '0');
            after.max = _j;
        }
    } else {
        for (var _i2 = beforePoint.length, _j2 = 0; _i2 > 0; _i2 = _i2 - 4, _j2++) {
            var _sIndex = _i2 - 4;
            before[_j2] = isNegative + beforePoint.slice(_sIndex > 0 ? _sIndex : 0, _i2);
            before.max = _j2;
        }
        for (var _i3 = 0, _j3 = 0; _i3 < afterPoint.length; _i3 = _i3 + 4, _j3++) {
            after[_j3] = isNegative + afterPoint.slice(_i3, _i3 + 4).padEnd(4, '0');
            after.max = _j3;
        }
    }
    if (after.max === undefined) {
        after.max = -1;
    }
    return { before: before, after: after, isNegative: isNegative };
};

var removeLeft = function removeLeft(a) {
    var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0';

    if (a[0] === remove) {
        if (!(remove === '0' && a[1] === '.')) {
            a = a.slice(1);
            return removeLeft(a, remove);
        }
    }
    return a;
};
exports.removeLeft = removeLeft;

var removeRight = function removeRight(a) {
    var remove = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '0';

    if (a.slice(-1) === remove) {
        a = a.slice(0, -1);
        return removeRight(a, remove);
    }
    return a;
};
exports.removeRight = removeRight;