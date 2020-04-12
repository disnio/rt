class Mvvm {
    constructor(options) {
        this.$el = options.el;
        this.$data = options.data;

        if (this.$el) {
            new Observer(this.$data);
            // 将数据代理到实例上直接操作实例即可，不需要通过vm.$data来进行操作
            this.proxyData(this.$data);
            new Compile(this.$el, this);
        }
    }
    proxyData(data) {
        Object.keys(data).forEach((key) => {
            Object.defineProperty(this, key, {
                get() {
                    return data[key];
                },
                set(newValue) {
                    data[key] = newValue;
                },
            });
        });
    }
}

// 一、模板编译
class Compile {
    constructor(el, vm) {
        this.$el = this.isElementNode(el) ? el : document.querySelector(el);
        this.$vm = vm;
        if (this.$el) {
            new Observer(this.$data);
            // 用数据和元素进行编译
            new Compile(this.$el, this);
            let fragment = this.node2fragment(this.$el);
            this.compile(fragment);
            this.$el.appendChild(fragment);
        }
    }
    // 是不是指令
    isDirective(name) {
        return name.includes("v-");
    }
    // 是不是元素节点
    isElementNode(node) {
        return node.nodeType === 1;
    }

    compileElement(node) {
        // 带 v-model v-text
        let attrs = node.attributes;
        Array.from(attrs).forEach((attr) => {
            let attrName = attr.name;
            if (this.isDirective(attrName)) {
                let expr = attr.value;
                let [, type] = attrName.split("-");
                // 调用对应的编译方法，编译那个节点，用数据替换表达式
                CompileUtil[type](node, this.vm, expr);
            }
        });
    }

    compileText(node) {
        let expr = node.textContent;
        let reg = /\{\{([^}]+)\}\}/g; // {{a}} {{b}} {{c}}
        if (reg.test(expr)) {
            CompileUtil["text"](node, this.vm, expr);
        }
    }

    compile(fragment) {
        // 需要递归每次拿子元素
        let childNodes = fragment.childNodes;
        Array.from(childNodes).forEach((node) => {
            if (this.isElementNode(node)) {
                this.compileElement(node);
                this.compile(node);
            } else {
                this.compileText(node);
            }
        });
    }
    // dom 节点转内存片段
    node2fragment(el) {
        // dom 节点放入内存中
        let fragment = document.createDocumentFragment();
        let firstChild;
        while ((firstChild = el.firstChild)) {
            fragment.appendChild(firstChild);
        }
        return fragment;
    }
}

const CompileUtil = {
    text(node, vm, expr) {
        let updateFn = this.updater["textUpdater"];
        // 用处理好的节点和内容进行编译
        let value = this.getTextVal(vm, expr);
        expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
            new Watcher(vm, arguments[1], (newValue) => {
                // 如果数据变化了，文本节点需要重新获取依赖的属性更新文本中的内容
                updateFn && updateFn(node, this.getTextVal(vm, expr));
            });
        });

        updateFn && updateFn(node, value);
    },

    getTextVal(vm, expr) {
        // 获取编译文本后的结果
        return expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
            // 依次去去数据对应的值
            return this.getVal(vm, arguments[1]);
        });
    },

    getVal(vm, expr) {
        // 获取实例上对应的数据
        expr = expr.split("."); // {{message.a}} [message,a] 实现依次取值
        // vm.$data.message => vm.$data.message.a
        return expr.reduce((prev, next) => {
            return prev[next];
        }, vm.$data);
    },

    setVal(vm, expr, value) {
        expr = expr.split(".");
        return expr.reduce((prev, next, currentIndex) => {
            if (currentIndex === expr.length - 1) {
                return (prev[next] = value);
            }
            return prev[next];
        }, vm.$data);
    },

    model(node, vm, expr) {
        let updateFn = this.updater["modelUpdater"];
        new Watcher(vm, expr, (newValue) => {
            // 当值变化后会调用cb 将新的值传递过来
            updateFn && updateFn(node, newValue);
        });
        node.addEventListener("input", (e) => {
            let newValue = e.target.value;
            // 监听输入事件将输入的内容设置到对应数据上
            this.setVal(vm, expr, newValue);
        });

        updateFn && updateFn(node, this.getVal(vm, expr));
    },

    updater: {
        textUpdater(node, value) {
            node.textContent = value;
        },
        modelUpdater(node, value) {
            node.value = value;
        },
    },
};

// 二、数据劫持
class Observer {
    constructor(data) {
        this.observe(data);
    }
    observe(data) {
        if (!data || typeof data !== "object") {
            return;
        }
        // 要将数据 一一劫持 先获取取到data的key和value
        Object.keys(data).forEach((key) => {
            // 定义响应式变化
            this.defineReactive(data, key, data[key]);
            this.observe(data[key]);
        });
    }

    defineReactive(obj, key, val) {
        let that = this;
        // 每个变化的数据 都会对应一个数组,这个数组是存放所有更新的操作
        let dep = new Dep();
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                Dep.target && dep.addSub(Dep.target);
                return val;
            },
            set(nv) {
                if (nv !== val) {
                    this.observe(nv);
                    val = nv;
                    dep.notify();
                }
            },
        });
    }
}

// Watcher 实现，观察者的目的就是给需要变化的那个元素增加一个观察者，
// 用新值和老值进行比对,如果数据变化就执行对应的方法

class Watcher {
    constructor(vm, expr, cb) {
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        this.value = this.get();
    }

    getVal(vm, expr) {
        expr = expr.split(".");
        return reducer((prev, next) => {
            return prev[next];
        }, vm.$data);
    }

    get() {
        // 在取值前先将watcher保存到Dep上
        Dep.target = this;
        let value = this.getVal(this.vm, this.expr);
        Dep.target = null;
        return value;
    }
    // 对外暴露的方法，如果值改变就可以调用这个方法来更新
    update() {
        let newValue = this.getVal(this.vm, this.expr);
        let oldValue = this.value;
        if (newValue !== oldValue) {
            this.cb(newValue);
        }
    }
}

// 发布订阅
class Dep {
    constructor() {
        // 订阅的数组
        this.subs = [];
    }
    addSub(watcher) {
        this.subs.push(watcher);
    }
    notify() {
        this.subs.forEach((watcher) => watcher.update());
    }
}


let vm = new Mvvm({
    el: "#app",
    data: {
        message: { a: "jw" },
        b: "MVVM",
    },
});