<template>
  <div>
    <h1>Products</h1>
    <AppTable :header="Headers" :data="Data" ></AppTable>
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import AppTable from "@/components/ui/Table.vue";

const Headers = [
    {title: "Id", value: "id"}
];

const Data = [{id: 1}]
</script>

<style scoped></style>
