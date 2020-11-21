const columns = [
    {
        //selection/index
        type: 'expand',
        width: '55',
        // render: this.renderExpand,
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
];
const childrenColumns = [
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
];

export {columns, childrenColumns}