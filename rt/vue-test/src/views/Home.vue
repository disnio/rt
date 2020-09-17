<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <div class="wrap" id="wrap"></div>
        <ks
            :author="author"
            ref="child"
            @hook:mounted="hasMounted"
            @count="handleCount"
        >
            <template #header="{user}">
                <h2>{{ user.name }}</h2>
            </template>
            <template #default="{changeName}">
                <p>{{ count }}</p>
                <a-button type="primary" @click="changeName">change</a-button>
            </template>
        </ks>
    </div>
</template>

<script>
// @ is an alias to /src
import * as d3 from 'd3';
import * as _ from 'lodash';
import ks from '../components/slot-test';

export default {
    name: 'home',
    data: function() {
        return {
            author: {
                name: 'Allen',
            },
            count: 0,
            tdata: [
                { name: 'Locke', value: 4 },
                { name: 'Reyes', value: 8 },
                { name: 'Ford', value: 15 },
                { name: 'Jarrah', value: 16 },
                { name: 'Shephard', value: 23 },
                { name: 'Kwon', value: 42 },
            ],
            cdata: [
                { name: 'Locke', value: 4 },
                { name: 'Reyes', value: 8 },
                { name: 'Ford', value: 15 },
                { name: 'Jarrah', value: 16 },
                { name: 'Shephard', value: 23 },
                { name: 'Kwon', value: 42 },
            ],
        };
    },
    components: {
        ks,
    },
    mounted() {
        const svg = d3
            .select('#wrap')
            .append('svg')
            .attr('width', 200)
            .attr('height', 240)
            .attr('viewBox', '0 0 200 200');

        const k1 = svg.append('g').attr('id', 'gg');

        d3.interval(() => {
            let n = _.random(0, 4);
            this.cdata = this.tdata.slice(n);
            this.draw();
        }, 2000);

        // this.$refs.child.$on('count', this.handleCount);
        // window.addEventListener("resize", this.resizeHandler);
        // this.$on("hook:beforeDestroy", () =>
        //     window.removeEventListener("resize", this.resizeHandler)
        // );
    },
    methods: {
        draw() {
            const tk = d3.select('#gg').selectAll('text');

            const upk = tk.data(this.cdata);

            upk.join(
                (enter) => {
                    var uek = enter
                        .append('text')
                        .attr('x', 20)
                        .attr('y', (d, i) => {
                            return i * 2.2 + 'em';
                        });

                    uek.append('tspan')
                        .attr('x', 20)
                        .attr('dy', '1em')
                        .style('color', '#000')
                        .style('font-size', 14)
                        .text((d) => {
                            console.log(d);
                            return d.name;
                        });

                    uek.append('tspan')
                        .attr('x', 20)
                        .attr('dy', '1em')
                        .attr('fill', '#f00')
                        .style('font-size', 12)
                        .text((d) => {
                            return d.value;
                        });
                },
                (update) => update,
                (exit) => exit.remove()
            );
        },
        hasMounted() {
            console.log('child mounted');
        },
        handleCount(clicks) {
            console.log(clicks);
            this.count = clicks;
        },
        resizeHandler(e) {
            console.log(e);
        },
    },
};
</script>

<style lang="scss" scoped></style>
