export default {
  name: 'st',
  abstract: true,
  props: {
    columns: Array
  },
  created() {

  },
  render(h) {
    const vnode = this.$slots.default[0];
    console.log(vnode)
    if(vnode.componentInstance){
      vnode.componentInstance.$children.forEach(v=>{
        console.log(v)
        // v.sortable = true;
        v.columnConfig.sortable=true;

      })
    }

    return vnode;
  },
};