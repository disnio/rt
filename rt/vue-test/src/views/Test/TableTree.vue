<template>
    <div id="dtest">
        <p>tet</p>
        <sort-tr
            v-bind:table="table"
            v-bind:columns="tcolumns"
            v-bind:data="tdata"
            v-bind:options="options"
            v-bind:event="event"
        >
        </sort-tr>

    </div>
</template>

<script>
import Vue from 'vue';
import {
    Card,
    Button,
    Image,
    Popover,
    Table,
    TableColumn,
    Loading,
} from 'element-ui';

Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Loading);
Vue.use(Button);
Vue.use(Card);
Vue.use(Image);
Vue.use(Popover);
import Sortable from "sortablejs";
import SortTr from '@/components/sort-table/sortTr';
Vue.component(SortTr.name, SortTr);
// import sortTable from '@/components/sort-table/sort-table.vue';

import ds from "./data";

export default {
    name: 'Test',
    components: {
        // sortTr
        // sortTable,
    },
    data() {
        return {
            // 表格的列属性 Table-column Attributes
            tcolumns: [
                {
                    //selection/index
                    type: 'expand',
                    width: '55',
                    render: this.renderExpand,
                },
                // {
                //     //selection/index
                //     prop: 'selection',
                //     width: '55',
                // },
                // 列索引生成
                // {
                //     //selection/index
                //     prop: 'index',
                //     width: '55',
                //     index: (index) => {
                //         return index + 1;
                //     },
                // },
                {
                    //selection/index
                    prop: 'id',
                    label: "ID",
                    width: '100',
                    sortable: true,
                },
                {
                    // 属性名 name
                    prop: 'date',
                    // 属性标签 label
                    label: '日期',
                    // 固定宽度
                    show: true,
                    // trur false custome
                    sortable: true,

                    width: '100',
                    // 自定义类
                    // class: 'myClass',
                    // labelClass: 'labelClass',
                    align: 'center',
                    minWidth: '100px',
                    // 自定义排序方法
                    // 排序属性，排序的副键  [String, Function, Array],
                    // sortMethod: null,
                    // sortBy: '',
                },
                {
                    prop: 'name',
                    label: '名称',
                    'show-overflow-tooltip': false,
                    sortable: true,
                    show: true,
                },
                // 自定义表格内容
                // {
                //     prop: 'img',
                //     label: '头像',
                //     width: '100',
                //     isImg: true,
                //     show: true,
                //     render: this.renderImg,
                // },
                {
                    prop: 'address',
                    label: '地址',
                    'show-overflow-tooltip': true,
                    width: '250',
                    sortable: true,
                    show: true,
                },
                // {
                //     // prop: 'options',
                //     label: '操作',
                //     fixed: 'right',
                //     render: this.renderTpl,
                //     show: true,
                // },
            ],
            childrenColumns: [
                // {
                //     //selection/index
                //     prop: 'selection',
                //     width: '55',
                // },
                // 列索引生成
                // {
                //     //selection/index
                //     prop: 'index',
                //     width: '55',
                //     index: (index) => {
                //         return index + 1;
                //     },
                // },
                {
                    //selection/index
                    prop: 'id',
                    label: "ID",
                    width: '100',
                    sortable: true,
                },
                {
                    // 属性名 name
                    prop: 'date',
                    // 属性标签 label
                    label: '日期',
                    // 固定宽度
                    show: true,
                    // trur false custome
                    sortable: true,

                    width: '100',
                    // 自定义类
                    // class: 'myClass',
                    // labelClass: 'labelClass',
                    align: 'center',
                    minWidth: '100px',
                    // 自定义排序方法
                    // 排序属性，排序的副键  [String, Function, Array],
                    // sortMethod: null,
                    // sortBy: '',
                },
                {
                    prop: 'name',
                    label: '名称',
                    'show-overflow-tooltip': false,
                    sortable: true,
                    show: true,
                },
                // 自定义表格内容
                // {
                //     prop: 'img',
                //     label: '头像',
                //     width: '100',
                //     isImg: true,
                //     show: true,
                //     render: this.renderImg,
                // },
                {
                    prop: 'address',
                    label: '地址',
                    'show-overflow-tooltip': true,
                    width: '250',
                    sortable: true,
                    show: true,
                },
                // {
                //     // prop: 'options',
                //     label: '操作',
                //     fixed: 'right',
                //     render: this.renderTpl,
                //     show: true,
                // },
            ],
            // Table Attributes
            table: {
                // stripe: true,
                'highlight-current-row': true,
                // 这里控制木偶组件的加载
                loading: false,
                defaultSort: {
                    prop: 'name',
                    order: 'ascending',
                },
                border: true,

                // 行关键字，树展开
                // "row-key": "id",
                // "tree-props":{children: 'children', hasChildren: 'hasChildren'}
            },
            // 表格的事件
            event: {
                'sort-change': this.tableSort,
                select: this.tableRowSelect,
                'select-all': this.tableRowSelectAll,
                'select-change': this.tableRowSelectChange,
                'row-click': this.rowClick,
            },
            // 最后一列的选项按钮和操作
            options: [
                {
                    type: 'success',
                    label: '编辑',
                    event: this.edit,
                    isShow: true,
                },
                {
                    type: 'danger',
                    label: '删除',
                    event: this.del,
                    isShow: true,
                },
            ],
            // 渲染表格需要的数据 fetch it
            tdata: ds,
        };
    },
    mounted() {
        this.rowDropTree();
    },
    methods: {
        renderExpand(h, props, item) {
            console.log(props.row)
            if ('children' in props.row) {
                // return (
                //     <el-card class="box-card">
                //         <div slot="header" className="clearfix">
                //             <span>卡片名称</span>
                //             <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                //         </div>
                //         <p>xxx</p>
                //     </el-card>
                // )
                return (
                    <sort-tr
                        table={this.table}
                        columns={this.childrenColumns}
                        data={props.row.children}
                        options={this.options}
                        event={this.event}
                    >
                    </sort-tr>
                )
                // return h("sort-tr",{
                //     table: this.table,
                //     columns: this.childrenColumns,
                //     data:props.row.children,
                //     options: this.options,
                //     event: this.event
                // }, )
            } else {
                return null;
            }
        },
        rowClick(row, column, event) {
            console.log("rowclick:", row, column, event)
        },
        // 树数据，sortablejs 渲染
        rowDropTree() {
            const tbody = document.querySelector('.el-table__body-wrapper tbody')
            const _this = this;
            Sortable.create(tbody, {
                disabled: false, // 是否开启拖拽
                ghostClass: 'sortable-ghost', //拖拽样式
                animation: 150, // 拖拽延时，效果更好看
                filter: ".el-table__row--level-0",
                group: { // 是否开启跨表拖拽
                    pull: false,
                    put: false
                },
                // 带 children 子元素列表时，改算法
                onEnd({newIndex, oldIndex}) {
                    console.log(newIndex, oldIndex)
                    let data = [..._this.tdata];
                    const currrow = data.splice(oldIndex, 1)[0];
                    data.splice(newIndex, 0, currrow)

                    _this.$nextTick(function () {
                        _this.tdata = data;
                        console.log(_this.tdata)
                    })
                }
            })
        },
        rowDrop() {
            const tbody = document.querySelector('.el-table__body-wrapper tbody')
            const _this = this;
            Sortable.create(tbody, {
                disabled: false, // 是否开启拖拽
                ghostClass: 'sortable-ghost', //拖拽样式
                animation: 150, // 拖拽延时，效果更好看
                group: { // 是否开启跨表拖拽
                    pull: false,
                    put: false
                },
                // 带 children 子元素列表时，改算法
                onEnd({newIndex, oldIndex}) {
                    let data = [..._this.tdata];
                    const currrow = data.splice(oldIndex, 1)[0];
                    data.splice(newIndex, 0, currrow)

                    _this.$nextTick(function () {
                        _this.tdata = data;
                        console.log(_this.tdata)
                    })
                }
            })
        },
        renderImg(h, scope, item) {
            return (
                <el-popover placement="left" trigger="click">
                    <div>
                        <el-image
                            style="width: 300px; height: auto"
                            src={scope.row[item.prop]}
                            fit="contain"
                            slot="reference"
                        ></el-image>
                    </div>
                    <el-image
                        style="width: 100px; height: 100px"
                        src={scope.row[item.prop]}
                        fit="contain"
                        slot="reference"
                    ></el-image>
                </el-popover>
            );
        },
        // 操作列渲染：渲染函数，scope.row，表格列属性
        renderTpl(h, scope, item) {
            return (
                this.options &&
                this.options.map((btn) =>
                    btn.isShow ? (
                        <el-button
                            type={btn.type}
                            onClick={() => btn.event(item)}
                        >
                            {btn.label}
                        </el-button>
                    ) : null
                )
            );
        },
        // 下面模拟表格编辑方法
        tableSort({prop, order}) {
            console.log('out:', prop, order);
            // 这里模拟的服务端获取排序后的数据，分页更新数据就可以
            // let nd = sortBy(this.tdata, function (v) {
            //     return v[prop];
            // });
            // this.tdata = order === 'descending' ? reverse(nd) : nd;
        },
        tableRowSelect(selArr, row) {
            console.log('sel:', selArr, row);
        },
        tableRowSelectAll(selArr) {
            console.log('selection:', selArr);
        },
        tableRowSelectChange(selArr) {
            console.log('selectionChange:', selArr);
        },

        // 表格最后一列操作对应的自定义方法
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
.el-table__expanded-cell {
    padding: 0px 0 0px 54px !important;
}
.sortable-ghost {
    opacity: 0.4;
    background-color: #F4E2C9;
}

</style>
