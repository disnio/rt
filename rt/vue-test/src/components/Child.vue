<template>
    <div class="content">
        <main class="text">
            <slot name="main"></slot>
        </main>
        <footer class="text">
            <slot name="footer" :user="user" :testClick=testClick>
                {{user.name}}
            </slot>
        </footer>
    </div>
</template>

<script>
export default {
    name: "Child",
    data(){
        return {
            user: {
                title:"test title",
                name: "test name"
            }
        }
    },
    methods:{
        testClick(){
            alert('ddd')
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
