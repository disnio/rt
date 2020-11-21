export default {


    props: {
        type: {
            type: String,
            default: 'default'
        },
        label: String,
        className: String,
        labelClassName: String,
        property: String,
        prop: String,
        width: {},
        minWidth: {},
        renderHeader: Function,

        sortable: {
            type: [Boolean, String],
            default: false
        },
        sortMethod: Function,
        sortBy: [String, Function, Array],

        sortOrders: {
            type: Array,
            default() {
                return ['ascending', 'descending', null];
            },
            validator(val) {
                return val.every(order => ['ascending', 'descending', null].indexOf(order) > -1);
            }
        },



        resizable: {
            type: Boolean,
            default: true
        },
        columnKey: String,
        align: String,
        headerAlign: String,
        showTooltipWhenOverflow: Boolean,
        showOverflowTooltip: Boolean,

        fixed: [Boolean, String],

        formatter: Function,
        selectable: Function,
        reserveSelection: Boolean,
        filterMethod: Function,
        filteredValue: Array,
        filters: Array,
        filterPlacement: String,
        filterMultiple: {
            type: Boolean,
            default: true
        },
        index: [Number, Function],

    },

}

const basicProps = ['columnKey', 'label', 'className', 'labelClassName', 'type', 'renderHeader', 'formatter', 'fixed', 'resizable'];
const sortProps = ['sortMethod', 'sortBy', 'sortOrders'];
const selectProps = ['selectable', 'reserveSelection'];
const filterProps = ['filterMethod', 'filters', 'filterMultiple', 'filterOpened', 'filteredValue', 'filterPlacement'];

const { prop, order } = this.defaultSort;

{
    column.sortable ? (<span
        class="caret-wrapper"
        on-click={($event) => this.handleSortClick($event, column)}>
        <i class="sort-caret ascending"
            on-click={($event) => this.handleSortClick($event, column, 'ascending')}>
        </i>
        <i class="sort-caret descending"
            on-click={($event) => this.handleSortClick($event, column, 'descending')}>
        </i>
    </span>) : ''
}

computed: selection