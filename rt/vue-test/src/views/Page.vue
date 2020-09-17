<template>
    <div class="wrap">
        <div class="item" v-if="state === 'loading'">Loading...</div>
        <div class="item">list: {{ list }}</div>
        <div>$route.params.id: {{ id }}</div>
    </div>
</template>

<script>
export default {
    name: 'page2',
    data: function() {
        return {
            state: 'loading',
            list: [0, 3, [4, 17], [2, [8, 6], 10]],
        };
    },
    props: {
        id: {
            type: String,
            default: '1',
        },
    },
    components: {},
    mounted() {
        this.init();
        console.log(this.id);
    },
    methods: {
        init() {
            setTimeout(() => {
                console.log('change state');
                this.state = 'over';
            }, 2000);
        },
        debounce2: function(func, wait = 50, immediate) {
            var timer;
            var context;
            var arg;

            var late = () =>
                setTimeout(function() {
                    timer = null;

                    if (!immediate) {
                        func.apply(context, arg);
                    }
                }, wait);

            return function(...params) {
                if (!timer) {
                    if (immediate) {
                        func.apply(this, params);
                    } else {
                        context = this;
                        arg = params;
                    }
                } else {
                    clearTimeout(timer);
                    timer = late();
                }
            };
        },

        throttle2: function(func, wait) {
            var timer = null;
            var previous = null;
            return function() {
                var now = +new Date();
                if (!previous) previous = now;
                if (now - previous > wait) {
                    func();
                    previous = now;
                    clearTimeout(timer);
                } else {
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        func();
                    }, wait);
                }
            };
        },
        curry: function(fn) {
            let len = fn.length;

            return function cu(...args) {
                if (args.length >= len) {
                    return fn.apply(null, args);
                } else {
                    return (...arg1) => {
                        return cu.apply(null, [...args, ...arg1]);
                    };
                }
            };
        },
        flattenDeep2: function(arr) {
            if (Array.isArray(arr)) {
                console.log(arr);
                return arr.reduce((arc, b) => {
                    return [...arc, ...this.flattenDeep(b)];
                }, []);
            } else {
                return [arr];
            }
        },
        myInstanceof: function(obj, typ) {
            let prototype = typ.prototype;
            obj = obj.__proto__;
            while (true) {
                if (obj === null) {
                    return false;
                }

                if (prototype === obj) {
                    return true;
                }

                obj = obj.__proto__;
            }
        },
        myNew: function(func) {
            var res = {};
            if (func.prototype !== null) {
                res.prototype = func.prototype;
            }

            var ret = func.apply(res, Array.prototype.slice.call(arguments, 1));
            if (
                (typeof ret === 'object' || typeof ret === 'function') &&
                ret !== null
            ) {
                console.log('object');
                return ret;
            }

            console.log('no obj');

            return res;
        },
        myInherit: function() {
            function Parent(name) {
                this.name = name;
            }

            Parent.prototype.sayName = function() {
                console.log('parent name:', this.name);
            };

            function Child(name, parentName) {
                Parent.call(this, parentName);
                this.name = name;
            }

            function create(proto) {
                function F() {}
                F.prototype = proto;
                return new F();
            }

            Child.prototype = create(Parent.prototype);
            Child.prototype.sayName = function() {
                console.log('child name:', this.name);
            };
            Child.prototype.constructor = Child;

            var parent = new Parent('father');
            parent.sayName();

            var child = new Child('son', 'father');
            child.sayName();
        },
        mySetTimeout: function() {
            var executeTimes = 0;
            var intervalTime = 500;
            var intervalId = null;
            var oriTime = +new Date();

            setTimeout(function ti() {
                executeTimes++;
                var nowExecuteTimes = executeTimes;
                var timeDiff = +new Date() - oriTime;
                console.log(
                    'timeoutFn ',
                    nowExecuteTimes,
                    'after ',
                    timeDiff,
                    'ms'
                );
                var delayParam = 0;
                sleep(1000);
                console.log('timeoutFn ', nowExecuteTimes, 'finish');

                if (executeTimes < 5) {
                    setTimeout(ti, intervalTime);
                }
            }, intervalTime);

            // intervalId = setInterval(function(){
            //     executeTimes++;
            //     var nowExecuteTimes = executeTimes;
            //     var timeDiff = (+new Date()) - oriTime;
            //     console.log("intervalFn", nowExecuteTimes, "after ", timeDiff, "ms");
            //     var delayParam = 0;
            //     sleep(1000);
            //     console.log("intervalFn ", nowExecuteTimes, "finish");

            //     if(executeTimes===5){
            //         clearInterval(intervalId);
            //     }
            // }, intervalTime);

            function sleep(sleepTime) {
                var start = +new Date();
                while (true) {
                    if (+new Date() - start > sleepTime) {
                        break;
                    }
                }
            }
        },
        myEventEmitter: class Event {
            constructor() {
                this.events = Object.create(null);
            }

            on(name, fn) {
                if (!this.events[name]) {
                    this.events[name] = [];
                }

                this.events[name].push(fn);
                return this;
            }

            emit(name, ...args) {
                if (!this.events[name]) {
                    return;
                }
                const fns = this.events[name];
                fns.forEach((fn) => fn.call(this, ...args));
                return this;
            }

            off(name, fn) {
                if (!this.events[name]) {
                    return;
                }
                if (!fn) {
                    this.events[name] = null;
                }
                const index = this.events[name].indexOf(fn);
                this.events[name].splice(index, 1);
                return this;
            }

            once(name, fn) {
                const only = () => {
                    fn.apply(this, arguments);
                    this.off(name, fn);
                };

                this.on(name, only);
                return this;
            }
        },
        myPrototypeInherit: function() {
            function Parent() {
                this.name = 'tom';
            }
            Parent.prototype.getName = function() {
                return this.name;
            };

            function Child() {
                this.cname = 'jerry';
            }

            Child.prototype = new Parent();
            Child.prototype.getSubName = function() {
                return this.cname;
            };

            var sub = new Child();
            console.log(sub.getName(), sub.getSubName());
        },
        myConstructorInherit: function() {
            function Parent() {
                this.colors = ['red', 'yellow'];
            }

            function Child() {
                Parent.call(this);
            }

            var sub = new Child();
            sub.colors.push('black');

            var sub2 = new Child();
            sub2.colors.push('white');

            console.log(sub.colors);
            console.log(sub2.colors);
        },
        myComposeInherite: function() {
            function Parent(name) {
                this.name = name;
                this.colors = ['red', 'black'];
            }

            Parent.prototype.sayName = function() {
                console.log(this.name);
            };

            function Child(name, age) {
                Parent.call(this, name);
                this.age = age;
            }

            Child.prototype = new Parent();
            Child.prototype.sayAge = function() {
                console.log(this.age, this.name);
            };

            var parent = new Parent('father');
            parent.sayName();

            var child = new Child('son', 13);
            child.sayAge();
        },
    },
};
</script>
<style></style>
