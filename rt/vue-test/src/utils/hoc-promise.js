// blog.sl1673495.now.sh/
// wrapped 也就是需要被包裹的组件对象。
// promiseFunc 也就是请求对应的函数，需要返回一个 Promise
export const withPromise = (promiseFn) => {
    return function (wrapped) {
        return {
            name: "with-promise",
            data() {
                return {
                    loading: false,
                    error: false,
                    result: null,
                };
            },
            mounted() {
                // 2、子组件的请求参数发生变化时，父组件也要响应式的重新发送请求
                this.$refs.wrapped.$watch(
                    "requestParams",
                    this.request.bind(this)
                );
                this.request();
            },
            methods: {
                request() {
                    this.loading = true;
                    // 1、从子组件实例中拿数据，拿到子组件上定义的参数，作为初始化发送请求的参数。
                    const { requestParams } = this.$refs.wrapped;
                    console.log(requestParams)
                    promiseFn(requestParams)
                        .then((result) => {
                            this.result = result;
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                },
            },
            // 这里可以用模板
            render(h) {

                // 这里传个 ref，就能拿到子组件实例了
                // 3、向下透传 attrs listeners scopedSlots
                const args = {
                    props: {
                        result: this.result,
                        loading: this.loading,
                    },
                    // 为被包裹的组件加引用
                    ref: "wrapped",
                };
                const wrapper = h("div", [
                    h(wrapped, { ...args, ...normalizeProps(this) }),
                    this.loading ? h("span", ["加载中……"]) : "完成",
                    this.error ? h("span", ["加载错误"]) : null,
                ]);


                return wrapper;
            },
        };
    };
};

// 封装一个从 this 上整合需要透传属性的函数：
export function normalizeProps(vm) {
    return {
        on: vm.$listeners,
        attrs: vm.$attrs,
        // 传递 $scopedSlots
        scopedSlots: vm.$scopedSlots,
    };
}

export const withLog = (wrapped) => {
    return {
        mounted() {
            console.log("I am mounted!");
        },
        render(h) {
            return h(wrapped, normalizeProps(this));
        },
    };
};

export function compose(...funcs) {
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

function composeWhile(...args) {
    return function (arg) {
        let i = args.length - 1;
        let res = arg;
        while (i >= 0) {
            let func = args[i];
            res = func(res);
            i--;
        }
        return res;
    };
}
