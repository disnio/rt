"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeProps = normalizeProps;
exports.compose = compose;
exports.withLog = exports.withPromise = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// blog.sl1673495.now.sh/
// wrapped 也就是需要被包裹的组件对象。
// promiseFunc 也就是请求对应的函数，需要返回一个 Promise
var withPromise = function withPromise(promiseFn) {
  return function (wrapped) {
    return {
      name: "with-promise",
      data: function data() {
        return {
          loading: false,
          error: false,
          result: null
        };
      },
      mounted: function mounted() {
        // 2、子组件的请求参数发生变化时，父组件也要响应式的重新发送请求
        this.$refs.wrapped.$watch("requestParams", this.request.bind(this));
        this.request();
      },
      methods: {
        request: function request() {
          var _this = this;

          this.loading = true; // 1、从子组件实例中拿数据，拿到子组件上定义的参数，作为初始化发送请求的参数。

          var requestParams = this.$refs.wrapped.requestParams;
          console.log(requestParams);
          promiseFn(requestParams).then(function (result) {
            _this.result = result;
          })["finally"](function () {
            _this.loading = false;
          });
        }
      },
      // 这里可以用模板
      render: function render(h) {
        // 这里传个 ref，就能拿到子组件实例了
        // 3、向下透传 attrs listeners scopedSlots
        var args = {
          props: {
            result: this.result,
            loading: this.loading
          },
          // 为被包裹的组件加引用
          ref: "wrapped"
        };
        var wrapper = h("div", [h(wrapped, _objectSpread({}, args, {}, normalizeProps(this))), this.loading ? h("span", ["加载中……"]) : "完成", this.error ? h("span", ["加载错误"]) : null]);
        return wrapper;
      }
    };
  };
}; // 封装一个从 this 上整合需要透传属性的函数：


exports.withPromise = withPromise;

function normalizeProps(vm) {
  return {
    on: vm.$listeners,
    attrs: vm.$attrs,
    // 传递 $scopedSlots
    scopedSlots: vm.$scopedSlots
  };
}

var withLog = function withLog(wrapped) {
  return {
    mounted: function mounted() {
      console.log("I am mounted!");
    },
    render: function render(h) {
      return h(wrapped, normalizeProps(this));
    }
  };
};

exports.withLog = withLog;

function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

function composeWhile() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return function (arg) {
    var i = args.length - 1;
    var res = arg;

    while (i >= 0) {
      var func = args[i];
      res = func(res);
      i--;
    }

    return res;
  };
}