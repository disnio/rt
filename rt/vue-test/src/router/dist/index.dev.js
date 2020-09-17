"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

var _Home = _interopRequireDefault(require("../views/Home.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_vue["default"].use(_vueRouter["default"]);

var routes = [{
  path: "/home",
  name: "home",
  component: _Home["default"]
}, {
  path: "/test",
  name: "test",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../views/Test/Test.vue"));
    });
  }
}, {
  path: "/pack",
  name: "pack",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../views/d3/Pack.vue"));
    });
  }
}, {
  path: "/hoc",
  name: "hoc",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../views/Hoc.vue"));
    });
  }
}, {
  path: "/page",
  name: "page",
  props: true,
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("../views/Page.vue"));
    });
  },
  children: [{
    path: "/page/:id",
    props: true,
    meta: {
      requireAuth: true
    },
    beforeEnter: function beforeEnter(to, from, next) {
      console.log("表现和 beforeEach 一致，只是作用在单独路由");
      next();
    },
    component: function component() {
      return Promise.resolve().then(function () {
        return _interopRequireWildcard(require("../views/Page.vue"));
      });
    }
  }]
}];
var router = new _vueRouter["default"]({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes
});
var _default = router;
exports["default"] = _default;