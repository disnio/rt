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

        };
    },
    methods: {
        handleCompositionStart(e){
            e.target.composing = true;
        },

        handleCompositionEnd(e){
            e.target.composing = false;
            var event = document.creatEvent("HTMLEvents");
            event.initEvent('input');
            e.target.dispatchEvent(event);
        },

        handleInput(e){
            debounce((e)=>{
                if(e.target.composing){
                    return;
                }
                // ajax
                console.log(e.target.input)
            }), 1000);
        },

    }
};
</script>
