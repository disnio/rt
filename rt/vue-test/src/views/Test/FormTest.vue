<template>
    <div id="dtest">
        <p>
            <el-button @click="handleCreate">新建</el-button>
        </p>
        <sort-tr
            v-bind:table="table"
            v-bind:columns="tcolumns"
            v-bind:data="tdata"
            v-bind:options="options"
            v-bind:event="event"
        >
        </sort-tr>
        <el-dialog
            :close-on-click-modal="false"
            :title="textMap[dialogStatus]"
            custom-class="w480"
            :visible.sync="dialogFormVisible"
        >
            <div :style="{paddingRight:'10px',height:dialogHeight+'px'}">
                <el-scrollbar>
                    <custom-form
                        v-bind:custom="customFormItems"
                        v-bind:formData="formData"
                        v-bind:formProps="formProps"
                        v-bind:rules="rules"
                        v-bind:formMethod="formMethod"
                    >

                    </custom-form>
                </el-scrollbar>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button v-if="dialogStatus=='create'" class="ok-btn" @click="create('custom_form')">确 定</el-button>
                <!--                <el-button v-else class="ok-btn" @click="update('custom_form')">确 定</el-button>-->
                <!--                <el-button class="cancel-btn" @click="cancel('custom_form')">取 消</el-button>-->
            </div>
        </el-dialog>
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
    Dialog,
    Scrollbar,
    Form,
    FormItem,
    Input,
    Select,
    DatePicker,
    Row,
    Col
} from 'element-ui';

{
    Vue.use(Table);
    Vue.use(TableColumn);
    Vue.use(Loading);
    Vue.use(Button);
    Vue.use(Card);
    Vue.use(Image);
    Vue.use(Popover);
    Vue.use(Dialog);
    Vue.use(Scrollbar);
    Vue.use(FormItem);
    Vue.use(Form);
    Vue.use(Input);
    Vue.use(Select);
    Vue.use(DatePicker);
    Vue.use(Row);
    Vue.use(Col);
}

import {SortTr} from '@/components/sort-table/sortTr';

import CustomForm from "@/views/Test/customTable/customTable";



import ds from "./data";
import {columns, childrenColumns} from "@/views/Test/columns";

export default {
    name: 'Test',
    components: {
        CustomForm,
        SortTr
        // sortTable,
    },
    data() {
        return {
            customFormItems: [
                {
                    type: "input",
                    label: "标签名称",
                    // 去数据的属性
                    valKey: "label",
                    hintText: "标签名"
                }
            ],
            // 对象传入，同步改变，所以真实数据需要副本传入
            formData: {
                label: "自定义标签名"
            },
            rules: {
                label: [
                    {
                        required: true,
                        message: "自定义标签名",
                        trigger: "blur"
                    },
                    {
                        min: 3,
                        max: 5,
                        message: "长度在 3 到 20 个字符",
                        trigger: "change"
                    }
                ],

            },
            formProps: {

                "labelWidth": "100px",
                "inline": false,
                // ["mini", "small", "medium"]
                "size": "small"
            },
            dialogFormVisible: false,
            dialogStatus: "",
            dialogHeight: "",

            textMap: {
                update: "编辑",
                create: "创建"
            },
            // 表格的列属性 Table-column Attributes
            tcolumns: columns,
            childrenColumns: childrenColumns,
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

            formMethod: {
                input: this.inputChange
            }
        };
    },
    mounted() {
    },
    methods: {
        inputChange(val) {
            console.log("form change", val);
            this.$set(this.formData, 'label', val);
        },
        //显示新增
        handleCreate() {
            // this.resetTemp();
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
        },
        //创建信息 todo 引用穿透
        create(formName) {
            const formRef = this.$refs['cust'].$refs['custom_form'];
            this.$nextTick(() => {
                formRef.validate((valid, obj) => {
                    if (valid) {
                        console.log("valid true")
                    } else {
                        return false;
                    }
                });
            })

        },
        //关闭窗口
        cancel(formName) {
            this.dialogFormVisible = false;
            this.$refs[formName].resetFields();
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
