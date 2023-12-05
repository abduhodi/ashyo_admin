import adminCategoriesApi from "@/api/admin/adminCategories";
import type { pQuery } from "@/interfaces";
import { defineStore } from "pinia";

export const useCategoryStore = defineStore({
  id: "category",
  state: () => ({
    allCategories: {
      data: null as any,
      error: null,
      loading: false,
    },
  }),
  actions: {
    async getAllCategories(query: pQuery) {
      try {
        this.allCategories.loading = true;
        this.allCategories.data = await adminCategoriesApi.getCategories({limit: 10, page: 0});
      } catch (error) {
        this.allCategories.error = error as null;
      } finally {
        this.allCategories.loading = false;
      }
    },
  },
});
