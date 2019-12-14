<template>
    <div class="container">
        <input
            ref="input"
            v-model="tt"
            @compositionstart="handleCompositionStart"
            @input="handleInput"
            @compositionend="handleCompositionEnd"
        />
    </div>
</template>

<script>
export default {
    name: "test",
    data: function() {
        return {
            tt: ""
        };
    },
    methods: {
        debounce(func, wait = 50) {
            let timer = 0;
            return function(...arg) {
                if (timer) clearTimeout(timer);
                timer = setTimeout(() => {
                    func.apply(this, args);
                }, wait);
            };
        },
        handleCompositionStart(e) {
            e.target.composing = true;
        },

        handleCompositionEnd(e) {
            e.target.composing = false;
            var event = document.creatEvent("HTMLEvents");
            event.initEvent("input");
            e.target.dispatchEvent(event);
        },

        handleInput(e) {
            console.log(e);
            this.debounce(e => {
                if (e.target.composing) {
                    return;
                }
                // ajax
                console.log(e.target.input);
            }, 200);
        }
    }
};
</script>
