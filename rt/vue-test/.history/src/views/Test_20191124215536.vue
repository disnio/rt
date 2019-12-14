<template>
    <div class="container">
        <input
            ref="input"
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
        handleCompositionStart(e) {
            // e.targe.composing = true;
        },

        handleCompositionEnd(e) {
            // e.targe.composing = false;
            var event = document.createEvent("HTMLEvents");
            event.initEvent("input");
            e.target.dispatchEvent(event);
        },

        handleInput(e) {
            if (e && e.target) {
                console.log("d", e);

                if (e.composing) {
                    return;
                }
                // ajax
                console.log(e.target.value);
            }
        }
    }
};
</script>
