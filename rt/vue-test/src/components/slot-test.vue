<template>
    <div class="content">
        <header>
            <slot name="header" :user="user"></slot>
            <p>
                <span :class="$style.author">author:</span>
                <span :class="nameClass"> {{ author.name }}</span>
            </p>
        </header>
        <main>
            <slot :changeName="changeName"></slot>
            <p class="main-line">
                <a-button type="primary" @click="handleClick"
                    >click {{ clicks }}</a-button
                >
            </p>
        </main>
    </div>
</template>

<script>
import { userMixin } from '@/components/user-mixin.js';

export default {
    name: 'ks',
    props: ['author'],
    mixins: [userMixin],
    data() {
        return {
            user: {
                name: 'Susy',
            },
            clicks: 0,
            // 新变量
            authorName: this.author.name,
        };
    },
    computed: {
        nameClass() {
            return this.clicks % 2 === 0 ? 'blue' : 'red';
        },
    },
    mounted() {
        console.log('user name:', this.getUserName());
    },
    methods: {
        handleClick() {
            this.clicks++;
            this.$emit('count', this.clicks);
            if (this.author.name !== this.authorName) {
                this.changeName();
            }
        },
        changeName() {
            this.$set(this.author, 'name', 'Emily' + this.clicks);
        },
    },
};
</script>

<style module>
.author {
    color: black;
}
</style>

<style scoped lang="scss">
$red: red;
.main-line {
    line-height: 24px;
    ::v-deep .ant-btn-primary {
        background: cyan;
    }
}
.red {
    color: $red;
}

.blue {
    color: blue;
}
</style>
