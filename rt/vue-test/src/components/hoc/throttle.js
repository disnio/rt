// throttle 节流, debounce 防抖
const throttle = function (fn, wait = 50, isDebounce = false, ctx = this) {
    let timer;
    let lastCall = 0;
    return function (...params) {
        if (isDebounce) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(ctx, params);
            }, wait);
        } else {
            const now = new Date().getTime();
            if (now - lastCall < wait) return;
            lastCall = now;
            fn.apply(ctx, params);
        }
    };
};

export default {
    name: 'Throttle',
    abstract: true,
    props: {
        time: Number,
        events: String,
        isDebounce: {
            type: Boolean,
            default: false,
        },
    },
    created() {
        this.eventKeys = this.events.split(',');
        this.originMap = {};
        this.throttledMap = {};
    },
    render() {
        const vnode = this.$slots.default[0];
        this.eventKeys.forEach(key => {
            const fn = vnode.data.on[key];

            if (fn === this.originMap[key] && this.throttledMap[key]) {
                vnode.data.on[key] = this.throttledMap[key];
            } else if (fn) {
                this.originMap[key] = fn;
                this.throttledMap[key] = throttle(
                    fn,
                    this.time,
                    this.isDebounce,
                    vnode
                );
                vnode.data.on[key] = this.throttledMap[key];
            }
        });
        return vnode;
    },
};
