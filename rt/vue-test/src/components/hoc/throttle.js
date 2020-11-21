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
a = {
    "status": 200, "rel": true, "data": {
        "total": 1,
        "rows": [{
            "labelId": "649e95427c7d4f48afde023c71ff1b3c",
            "labelCode": "cs",
            "labelName": "测试",
            "labelType": "1",
            "isdelete": "0",
            "crtUser": "1",
            "crtTime": "2020-09-09 22:27:50",
            "updUser": "1",
            "updTime": "2020-09-09 22:27:50"
        }],
        "columns": [{
            "prop": "label_id",
            "label": "标签主键",
            "see": 1,
            "sortable": 1,
            "width": "180"
        }, {"prop": "label_code", "label": "标签编码", "see": 1, "sortable": 1, "width": "180"}, {
            "prop": "label_name",
            "label": "标签名称",
            "see": 1,
            "sortable": 1,
            "width": "180"
        }, {"prop": "label_type", "label": "标签分类", "see": 1, "sortable": 1, "width": "180"}, {
            "prop": "isdelete",
            "label": "是否删除",
            "see": 1,
            "sortable": 1,
            "width": "180"
        }, {"prop": "create_user", "label": "创建人", "see": 1, "sortable": 1, "width": "180"}, {
            "prop": "create_time",
            "label": "创建事件",
            "see": 1,
            "sortable": 1,
            "width": "180"
        }, {"prop": "modify_user", "label": "修改人", "see": 1, "sortable": 1, "width": "180"}, {
            "prop": "modify_time",
            "label": "修改时间",
            "see": 1,
            "sortable": 1,
            "width": "180"
        }]
    }
}
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
