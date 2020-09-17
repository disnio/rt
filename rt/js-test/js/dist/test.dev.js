"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var arr = [];

for (var i = 97; i <= 106; i++) {
  arr.push(String.fromCharCode(i));
}

var res = arr.map(function (v, i) {
  return _defineProperty({}, v, i + 1);
});
console.log(res);