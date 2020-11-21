<template>
    <div id="dtest">
        <sort-table
            v-bind:table="table"
            v-bind:columns="tcolumns"
            v-bind:data="tdata"
            v-bind:options="toptions"
            v-bind:event="event"
        ></sort-table>
    </div>
</template>

<script>
import sortTable from '@/components/sort-table/sort-table.vue';

import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import delay from 'lodash/delay';
export default {
    name: 'home',
    components: {
        sortTable,
    },
    data() {
        return {
            tcolumns: [
                {
                    prop: 'selection',
                    width: '55',
                },
                {
                    // 属性名 name
                    prop: 'date',
                    // 属性标签 label
                    label: '日期11',
                    // 固定宽度
                    width: '180',
                    // 自定义类
                    class: 'myClass',
                    labelClass: 'labelClass',
                    align: 'center',
                    minWidth: '100px',
                    formatter: '',
                    // trur false custome
                    sortable: true,
                    // 自定义排序方法
                    sortMethod: null, // 排序属性，排序的副键  [String, Function, Array],
                    sortBy: '',
                    show: true,
                },
                {
                    prop: 'name',
                    label: '名称',
                    tooltip: false,
                    sortable: 'custom',
                    show: true,
                },
                //
                {
                    prop: 'importance',
                    label: '重要性',
                    tooltip: false,
                    sortable: true,
                    show: false,
                },

                {
                    prop: 'img',
                    label: '头像',
                    width: '180',
                    isImg: true,
                    show: true,
                },
                {
                    prop: 'address',
                    label: '地址',
                    width: '180',
                    tooltip: true,
                    sortable: true,
                    show: true,
                },
                {
                    prop: 'options',
                    label: '操作',
                    width: '200',
                    fixed: 'right',
                },
            ],
            table: {
                key: 10001,
                stripe: true,
                // 这里控制木偶组件的加载
                loading: false,
                defaultSort: {
                    prop: 'name',
                    order: 'ascending',
                },
            },

            event: {
                sort: this.tableSort,
            },

            toptions: [
                {
                    type: 'success',
                    label: '编辑',
                    event: this.edit,
                    // 接收 scopedslot 发送的行信息
                    isShow: (item) => {
                        return item.status == 0 ? false : true;
                    },
                },
                {
                    type: 'danger',
                    label: '删除',
                    event: this.del,
                    isShow: (item) => {
                        return item.status == 1 ? false : true;
                    },
                },
            ],
            tdata: [
                {
                    date: '2020-09-02',
                    name: '王小虎',
                    img: '/static/img1.jpg',
                    address: '上海市普陀区金沙江路 1518 弄',
                    importance: 1,
                },
                {
                    date: '2020-05-04',
                    name: '李小虎',
                    img: '/static/img2.jpg',
                    address: '上海市普陀区金沙江路 1517 弄',
                    importance: 2,
                },
                {
                    date: '2020-07-01',
                    name: 'A小虎',
                    img: '/static/img1.jpg',
                    address: '上海市普陀区金沙江路 1519 弄',
                    importance: 3,
                },
                {
                    date: '2020-03-03',
                    name: 'B小虎',
                    img: '/static/img2.jpg',
                    address: '上海市普陀区金沙江路 1516 弄',
                    importance: 4,
                },
            ],
        };
    },
    methods: {
        tableSort({ prop, order }) {
            console.log('out:', prop, order);
            // 这里模拟的服务端获取排序后的数据，分页更新数据就可以
            let nd = sortBy(this.tdata, function (v) {
                return v[prop];
            });
            this.tdata = order === 'descending' ? reverse(nd) : nd;
        },
        edit(val) {
            console.log(val);
        },
        del(val) {
            console.log(val);
        },
    },
};
</script>

<style>
.myClass {
    color: red;
    font-size: 18px;
    font-weight: bold;
}

.labelClass {
    color: blue;
    font-size: 36px;
}
</style>
