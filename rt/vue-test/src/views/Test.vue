<template>
    <div class="container">
        <child>
            <template v-slot:main>
                <div>
                    导航
                </div>
            </template>

            <template #footer="{user:person, testClick}">
                <div>
                    {{person.title}}
                    <button @click="testClick">click me</button>
                </div>
            </template>
        </child>
    </div>
</template>

<script>
import Child from "@/components/Child";

export default {
    name: "test",
    data: function() {
        return {};
    },
    components: {
        child: Child
    }
};
</script>
