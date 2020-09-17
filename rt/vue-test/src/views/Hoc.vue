<template>
    <div class="hoc">
        <hoc msg="msg" @change="onChange">
            <template>
                <div>I am slot</div>
            </template>
            <template v-slot:named>
                <div>I am named slot</div>
            </template>
        </hoc>
    </div>
</template>

<script>
import { withPromise, withLog, compose } from '../utils/hoc-promise';
import wrapped from '../components/hoc/wrapped.vue';

// 假装这是一个 axios 请求函数
const request = params => {
    return new Promise(resolve => {
        // setTimeout(() => {
        //     }, 1000);
        resolve(params);
    });
};

const hoc = compose(withLog, withPromise(request))(wrapped);

export default {
    components: {
        hoc,
    },
    methods: {
        onChange() {
            console.log('wrapped params change');
        },
    },
};
</script>
