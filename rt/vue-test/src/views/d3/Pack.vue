<template>
    <div class="home">
        <div class="wrap" id="wrap" ref="wrap">

        </div>
    </div>
</template>

<script>
    // @ is an alias to /src

    import * as d3 from "d3";
    import * as _ from "lodash";
    import rf from "./data";

    // const slib = new std.Library();

    export default {
        name: "pack",
        data: function () {
            return {
                rd: rf,
                width: 800,
                height: 600,
                // 颜色集合映射
                color: d3.scaleOrdinal(d3.schemePaired)
            }
                ;
        },
        mounted() {
            const svg = this.init();
            let root = this.pack(this.rd);
            this.draw(svg, root);
        },
        methods: {
            // 打包图数据处理
            pack(data) {
                return d3.pack()
                    .size([this.width, this.height])
                    .padding(2)(d3.hierarchy(data)
                        .sum(d => d.value)
                        .sort((a, b) => b.value - a.value))
            },

            init() {

                // 创建svg
                return d3.select("#wrap").append("svg")
                    .attr("viewBox", [0, 0, this.width, this.height])
                    .style("font-size", "10px")
                    .style("overflow", "visible")
                    .attr("text-anchor", "middle");
            },

            draw(svg, root) {
                // 根据数据创建分组标签和布局
                const node = svg.append("g")
                    .selectAll("g")
                    .data(root.descendants())
                    .join("g")
                    .attr("transform", d => `translate(${d.x},${d.y})`);

                // 在各分组中添加圆圈并填充
                node.append("circle").attr("r", function (d) {
                    return d.r;
                }).attr("fill", d => this.color(d.value % 550));

                // 没有孩子的就是叶节点
                const leaf = node
                    .filter(d => !d.children);

                // 不要和上面连写，这个是单独选择
                leaf.select("circle");
                // 加 name
                leaf.append("text")
                    .selectAll("tspan")
                    // 拆分为2元素数组，name 则有两行文字
                    .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
                    .join("tspan")
                    .attr("x", 0)
                    .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.4}em`)
                    .text(d => d);
                // 单独加一行 value 值
                leaf.append("text")
                    .append("tspan")
                    .text(function (d) {
                        return d.value;
                    })
                    .attr("dy", "2em");

                // 类似于A标签的 title，鼠标放上去提示文字
                node.append("title")
                    .text(d => {
                        return `${d.ancestors().map(d => d.data.name).reverse().join("/")}${d.value.toLocaleString()}`
                    });
            },

        },
    };
</script>

<style lang="scss" scoped>

</style>
