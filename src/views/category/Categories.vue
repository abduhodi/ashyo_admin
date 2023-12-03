<template>
    <div>
        <h1>Categories</h1>
    </div>
</template>

<script setup lang="ts">
import { useCategoryStore } from "@/stores/category"
const store = useCategoryStore();

const get = async () => {console.log( await store.getAllCategories())}

get()
</script>

<style scoped>

</style>