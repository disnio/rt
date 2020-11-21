
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
export default {
  name: "CItem",
  componentName: "CItem",
  props: {
    itemProps: {
      type: Object,
    },

    elEvent: {
      type: Object
    },

    elProps: {
      type: Object,
    },
    model: [Array, String, Object]
  },

  methods: {},
  render(h) {
    const item_props = {
      prop: this.itemProps.prop,
      props: {
        ...this.itemProps
      },
      on: {
        ...this.$listeners,
      },
      attrs: this.$attrs,
      // ref: "custom_form",
      // // 传递 $scopedSlots
      // scopedSlots: this.$scopedSlots,
    }

    const input_props = {

      props: {
        ...this.elProps
      },
      attrs: this.$attrs,
      on: {
        ...this.$listeners,
        ...this.elEvent,
      },
    }

    return (
      <el-form-item {...item_props}>
        <el-input
          vModel={this.model}
          {...input_props}
        >

        </el-input>
      </el-form-item>
    )
  }
}

