<script>
export default {
  name: "cItem",
  props: {
    itemProps: [Array, Object],
    values: Object
  },
  data() {
    return {
      form: {...this.values}
    }
  },
  watch: {
    form: {
      deep: true,
      handler: function (n) {
        console.log(n)
        this.$emit(`update:values`, n);
      }
    }
  },

  methods: {
    renderInput(props) {
      console.log("render input")
      let item_props = {
        props: props.item,
      };

      let input_props = {
        attrs: {
          ...props.el,
        },
      };
      // 对应组件内的slot 必须做处理，转到组件内部
      const append = (
        this.$slots.input_append && <div slot="append">
          {this.$slots.input_append}
        </div>
      );

      return (
        <el-form-item
          {...item_props}
        >
          <el-input
            type={props.type}
            {...input_props}
            vModel={this.form[props.item.prop]}>
            {append}
          </el-input>
        </el-form-item>
      )
    },

    renderCheckbox(props) {
      let item_props = {
        props: props.item,
      };
      let chk_props = {
        attrs: {
          ...props.el
        },
      };
      return (
        <el-form-item {...item_props}>
          <el-checkbox-group vModel={this.form[props.item.prop]}>
            {
              props.options && props.options.map((v, i) => {
                return (
                  <el-checkbox {...chk_props} label={v.label} value={v.value} key={i}>

                  </el-checkbox>
                )
              })
            }

          </el-checkbox-group>
        </el-form-item>
      )
    },

    renderDate(props) {
      let item_props = {
        props: props.item,
      };
      let date_props = {
        attrs: {
          ...props.el
        },
      };
      return (
        <el-form-item {...item_props}>
          <el-date-picker
            {...date_props}
            vModel={this.form[props.item.prop]}
            type={props.type}
          >
          </el-date-picker>
        </el-form-item>
      )
    },

    renderSwitch(props) {
      let item_props = {
        props: props.item,
      };
      let sw_props = {
        attrs: {
          ...props.el
        },
      };
      return (
        <el-form-item {...item_props}>
          <el-switch
            {...sw_props}
            vModel={this.form[props.item.prop]}
            type={props.type}
          >
          </el-switch>
        </el-form-item>
      )
    },

    renderSelect(props) {
      console.log("sel:", props)
      let item_props = {
        props: props.item,
      };
      let sel_props = {
        attrs: {
          ...props.el
        },
      };
      return (
        <el-form-item {...item_props}>
          <el-select {...sel_props} vModel={this.form[props.item.prop]}>
            {
              props.options && props.options.map((v, i) => {
                return (
                  <el-option label={v.label} value={v.value} key={i}>

                  </el-option>
                )
              })
            }
          </el-select>
        </el-form-item>
      )
    },

    renderText(props) {
      let item_props = {
        props: props.item,
      };

      let txt_props = {
        attrs: {
          ...props.el,
        },
      };

      return (
        <el-form-item
          {...item_props}
        >
          <el-input
            type={props.type}
            {...txt_props}
            vModel={this.form[props.item.prop]}>
          </el-input>
        </el-form-item>
      )
    },

    renderAutoComplete(props) {
      let item_props = {
        props: props.item,
      };

      let auto_props = {
        attrs: {
          ...props.el,
        },
      };
      // 对应组件内的slot 必须做处理，转到组件内部
      const suffix = (
        this.$slots.auto_suffix && <div slot="suffix">
          {this.$slots.auto_suffix}
        </div>
      );

      return (
        <el-form-item
          {...item_props}
        >
          <el-autocomplete
            type={props.type}
            {...auto_props}
            vModel={this.form[props.item.prop]}>
            {suffix}
          </el-autocomplete>
        </el-form-item>
      )
    },

    renderRow(child, key) {
      return (
        <el-row>
          <el-col span={24} key={key} md={12} lg={6} xl={4}>
            {child}
          </el-col>
        </el-row>
      )
    }
  },
  render(createElement, context) {
    let rows = this.itemProps.map((row, index) => {
      if (Array.isArray(row)) {
        let form_row = row.map((v, i) => {
          switch (v.types) {
            case "select":
              return this.renderSelect(v);
            case "checkbox":
              return this.renderCheckbox(v);
            case "date":
              return this.renderDate(v);
            case "switch":
              return this.renderSwitch(v);
            case "textarea":
              return this.renderText(v);
            default:
              return this.renderInput(v);
          }
        })

        return this.renderRow(form_row, "form_row" + index)
      } else {
        return <div>空</div>
      }
    });

    return (
      <div>
        {rows}
      </div>
    )
  }

}
</script>

<style scoped>

</style>
