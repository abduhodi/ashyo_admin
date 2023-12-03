import adminCategoriesApi from "@/api/admin/adminCategories";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore({
  id: "category",
  state: () => ({
    allCategories: {
      data: null,
      error: null,
      loading: false,
    },
  }),
  actions: {
    async getAllCategories() {
      try {
        this.allCategories.loading = true;
        return adminCategoriesApi.getCategories();
      } catch (error) {
        this.allCategories.error = error as null;
      } finally {
        this.allCategories.loading = false;
      }
    },
  },
});
