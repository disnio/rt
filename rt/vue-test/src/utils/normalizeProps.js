export function normalizeProps(vm) {
    return {
        on: vm.$listeners,
        attrs: vm.$attrs,
        scopedSlots: vm.$scopedSlots
    }
}