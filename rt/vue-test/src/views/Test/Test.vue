<template>
  <div id="dtest">
    <!--        <sort-tr-->
    <!--            v-bind:table="table"-->
    <!--            v-bind:columns="tcolumns"-->
    <!--            v-bind:data="tdata"-->
    <!--            v-bind:options="options"-->
    <!--            v-bind:event="event"-->
    <!--        >-->
    <!--        </sort-tr>-->
    <st :columns="tcolumns">
      <el-table
        :data="tdata"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </st>
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


import ds from "./data0";
import {columns, childrenColumns} from "@/views/Test/columns";

import st from '@/components/st';

export default {
  name: 'Test',
  components: {
    st
  },
  data() {
    return {
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
