<template>
  <div class="scroll p-0 m-0 flex flex-col">
    <div class="w-[100%] h-[100vh]" id="category_table">
      <h1 class="text-[22px] font-bold m-3">Categories</h1>
      <delete-modal ref="delete_modal"></delete-modal>
      <Table :header="headers" :data="store?.allCategories?.data"
        ><template #body_action="{ item }">
          <span class="w-full flex justify-start items-center">
            <svg-icon
              type="mdi"
              :path="mdiPencil"
              @click="getEdit(item)"
              class="hover:text-orange-600"
            ></svg-icon>
            <svg-icon
              type="mdi"
              :path="mdiTrashCanOutline"
              @click="item_action.openDelModal(item._id)"
              class="hover:text-red-500 text-red-800"
            ></svg-icon>
          </span>
        </template>
        ></Table
      >
      <div
        class="flex absolute left-[50%] transform translate-x-[-50%] bottom-7 justify-center text-center"
      >
        <v-pagination
          v-model="params.page"
          :pages="params.last_page"
          :range-size="1"
          active-color="#DCEDFF"
          
        />
      </div>
    </div>

    <div
      class="w-[100%] h-[100vh] bg-[transparent] flex justify-center items-center"
    >
      <div class="form-container w-[50%]" id="category_edit">
        <h3 class="text-[#06172D] text-[30px] font-bold text-center my-4">
          {{ isEditing ? "Edit" : "Add" }} Category
        </h3>
        <form
          @submit.prevent
          action=""
          class="flex flex-col gap-3 w-[80%] m-auto"
        >
          <div class="input_box">
            <label for="categ_name">Name: </label>
            <input v-model="form.name" type="text" id="categ_name" required />
          </div>
          <div class="input_box">
            <label for="categ_desc">Description: </label>
            <textarea
              v-model="form.description"
              cols="4"
              rows="6"
              type="text"
              id="categ_desc"
              style="resize: none"
              required
            ></textarea>
          </div>

          <div class="flex justify-between w-[100%]">
            <label
              >Parent id:
              {{ form.parent_id ? form.parent_id : "No selected" }}</label
            >
            <el-menu
              :default-active="activeIndex"
              class="el-menu-demo w-[15%] inline-block h-[4] p-0 m-0 border-2 bg-[transparent]"
              style="background: transparent; padding: 0; margin: 0"
              mode="horizontal"
              @select="handleSelect"
            >
              <div
                v-for="(item, indexi) in store?.allCategories?.data"
                :key="indexi"
              >
                <el-sub-menu
                  v-if="item?.children.length > 0"
                  index="{{"
                  indexi
                  }}
                >
                  <template #title>{{ item?.name }}</template>
                  <el-menu-item
                    v-for="(sub, index) in item?.children"
                    :key="index"
                    index="{{ index }}"
                    >{{ sub?.name }}</el-menu-item
                  >
                </el-sub-menu>
              </div>
            </el-menu>
          </div>
          <div class="flex gap-2">
            <button
              @click="cencel()"
              type="submit"
              class="flex w-[80%] m-auto mt-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {{ isEditing ? "Cencel" : "To List" }}
            </button>
            <button
              @click="save"
              type="submit"
              class="flex w-[80%] m-auto mt-4 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import { useCategoryStore } from "@/stores/category";
const store = useCategoryStore();
const params = ref({
  page: 1,
  limit: 9,
  last_page: null,
});
import Table from "@/components/ui/Table.vue";
import { ref } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPencil, mdiTrashCanOutline } from "@mdi/js";
const delete_modal = ref();
import DeleteModal from "@/views/Modals/DeleteModal.vue";
store.getAllCategories({ page: 0, limit: 10 });
const isEditing = ref(false);
const headers = ref([
  { title: "ID", value: "id" },
  { title: "Category name", value: "name" },
  { title: "Description", value: "description" },
  { title: "Parent", value: "parent_id" },
  { title: "Actions", value: "action" },
]);

const form = ref({
  name: "",
  description: "",
  parent_id: null,
});

const save = () => {
  console.log(form.value);
};
const cencel = () => {
  location.href = "#category_table";
  isEditing.value = false;
  form.value = {
    name: "",
    description: "",
    parent_id: null,
  };
};

const getEdit = (item) => {
  location.href = "#category_edit";
  form.value = item;
  isEditing.value = true;
};
</script>

<style scoped>
.input_box {
  display: flex;
  flex-flow: column nowrap;
}

label {
  font-size: 18px;
  font-weight: 900;
  color: #06172d;
  font-weight: 400;
  cursor: pointer;
}

input,
textarea {
  outline: none;
  padding: 8px;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid #12486b;
  border-radius: 10px;
}
</style>
