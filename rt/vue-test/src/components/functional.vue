<template>
    <div>
        <Functional
            class="my"
            :class="you"
            style="font-weight: bold"
            :sytle="mystyle"
            value="1"
        >
        </Functional>
        <el-divider contentPosition=""></el-divider>
    </div>
</template>
<script>
import Vue from 'vue';
import { Button, Divider } from 'element-ui';
import { kebabCase } from 'element-ui/lib/utils/util';
Vue.use(Button);
Vue.use(Divider);

const Functional = {
    name: 'functional',
    functional: true,
    render(h, context) {
        console.log(kebabCase('aaBcCa'));
        const data = {
            props: { value: '来自props', ...context.data },
            attrs: { value1: '来自attrs' },
        };
        return (
            <div
                style={{
                    marginTop: '10px',
                }}
            >
                {JSON.stringify(context.props)}
            </div>
        );
    },
};

Vue.component('Functional', Functional);

export default {
    name: 'functional-container',
    components: {
        functional: Functional,
    },
    data: function () {
        return {
            mystyle: 'width: 100px; height: 50px;',
            you: 'you',
        };
    },
    methods: {
        handleClick() {
            console.log('click');
        },
    },
};
</script>

<style>
.my {
    font-size: 16px;
}
.you {
    color: red;
}
</style>
