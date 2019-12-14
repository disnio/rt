<template>
    <div class="container">
        <input ref="input" @input="handleInput" />
    </div>
</template>

<script>
export default {
    name: "test",
    data: function() {
        return {
            tt: "",
            timer: null
        };
    },
    methods: {
        debounce(func, wait = 50) {
            return (...args) => {
                if (this.timer) clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    func.apply(this, args);
                }, wait);
            };
        },
        // handleCompositionStart(e) {
        //     e.target.composing = true;
        // },

        // handleCompositionEnd(e) {
        //     e.target.composing = false;
        //     var event = document.createEvent("HTMLEvents");
        //     event.initEvent("input");
        //     event.target.composing = false;
        //     e.target.dispatchEvent(event);
        // },

        handleInput(e) {
            var ev = e;
            if (ev && ev.target) {
                console.log(ev);
                this.debounce(ev => {
                    if (ev.composed) {
                        return;
                    }
                    // ajax
                    console.log(ev.target.input);
                }, 200)();
            }
        }
    }
};
</script>
