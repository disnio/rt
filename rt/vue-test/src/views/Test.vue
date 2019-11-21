<template>
    <div class="container">
        <p>收到：{{reveivedIframeMsg}}</p>
        <input type="text" id="message-input" v-model="txt" />
        <button @click.prevent="btnClick">send message</button>
        <iframe ref="ifr" src="http://localhost:5005/page2" frameborder="1"></iframe>
    </div>
</template>

<script>


export default {
    name: "test",
    data: function() {
        return {
            txt: "",
            reveivedIframeMsg: ""
        };
    },
    methods: {
        btnClick(e) {
            this.$refs['ifr'].contentWindow.postMessage(this.txt, '*');
        },

    }
};
</script>
