import {axiosD, axiosG, axiosJ, axiosK, axiosP} from "./request";

const addMenu = "admin/menu/addMenu"; // 新增菜单
const deleteMenu = "admin/menu/delMenu"; // 删除菜单
const editMenu = "admin/menu/editMenu"; // 编辑菜单
const editRolesMenus = "admin/menu/editRolesMenus"; // 编辑权限
const getMenu = "admin/menu/treeMenu"; // 获取菜单
const getAllMenu = "admin/menu/treeAllMenu"; // 获取所有菜单

export const addMenuApi = data => axiosK(addMenu, data);
export const deleteMenuApi = data => axiosD(deleteMenu, data);
export const editMenuApi = data => axiosP(editMenu, data);
export const editRolesMenusApi = data => axiosJ(editRolesMenus, data);
export const getMenuApi = () => axiosG(getMenu);
export const getAllMenuApi = data => axiosG(getAllMenu, data);
