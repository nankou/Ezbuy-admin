import {axiosD, axiosG, axiosK, axiosP} from "@/api/request";

const addDept = "admin/dept/addDept"; // 新增部门
const deleteDept = "admin/dept/delDept"; // 删除部门
const editDept = "admin/dept/editDept"; // 编辑部门
const getDeptTree = "admin/dept/treeDept"; // 分页获得部门列表

export const addDeptApi = data => axiosK(addDept, data);
export const deleteDeptApi = data => axiosD(deleteDept, data);
export const editDeptApi = data => axiosP(editDept, data);
export const getDeptTreeApi = data => axiosG(getDeptTree, data);
