<template>
    <div id="dtest">
        <p></p>
        <p></p>
        <p id="plast"></p>
    </div>
</template>

<script>
import Vue from 'vue';
import Mock from 'mockjs';
import * as d3 from 'd3';

export default {
    components: {},
    data() {
        return {
            rcHeight: 25,
            dataset: [1.2, 2.3, 0.9, 1.5, 3.3],
        };
    },
    created() {},

    mounted() {
      
    },
};
</script>
