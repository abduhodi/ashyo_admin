import axiosClient from "../apiClient";
import { type pQuery } from "@/interfaces";
const adminCategoriesApi = {
    getCategories(params: pQuery) {
    const url = `categories`;
    // const url = `categories`;
    return axiosClient.get(url);
  },
  //    addStudent(payload) {
  //       const url = "admin/add-student";
  //       return axiosClient.post(url, { ...payload, role_id: 3 });
  //    },
  //    updateStudent(id, payload) {
  //       const url = `admin/update-student/${id}`;
  //       return axiosClient.put(url, payload);
  //    },
  //    deleteStudent(id){
  //       const url = `admin/delete-student/${id}`;
  //       return axiosClient.delete(url);
  //    }
};
export default adminCategoriesApi;
