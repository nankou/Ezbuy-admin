import {axiosD, axiosG, axiosJ, axiosU} from "./request";

const addRole = "admin/role/addRole"; // 新增角色
const deleteRole = "admin/role/delRole"; // 删除角色
const editRole = "admin/role/editRole"; // 编辑角色
const getRoleList = "admin/role/listRole"; // 获得角色列表
const getRoleTree = "admin/role/treeRole"; // 获得权限树

export const addRoleApi = data => axiosJ(addRole, data);
export const deleteRoleApi = data => axiosD(deleteRole, data);
export const editRoleApi = data => axiosU(editRole, data);
export const getRoleListApi = data => axiosG(getRoleList, data);
export const getRoleTreeApi = () => axiosG(getRoleTree);
