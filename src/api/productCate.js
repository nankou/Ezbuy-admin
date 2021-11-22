import {axiosG, axiosK,axiosD,axiosA,axiosM} from "./request";

const getProductAttrCateList= "/productSort/listParent"; // 获取商品分类列表
const createProductCateApi= "/productSort/addProductSort"; // 添加商品分类
const editProductCateApi= "/productSort/editProductSort"; // 更改商品分类
const deleteProductCateApi= "/productSort/delProductSort"; // 删除商品分类
const getProductCateApi= "/productSort/getProductSort"; // 通过id获得商品分类
const updateShowStatusApi= "/productSort/editProductSort"; // 更新是否显示状态
const updateNavStatusApi= "/productSort/editProductSort"; // 更新是否导航栏状态
const fetchListWithChildrenApi= "/productSort/listSon"; // 查看下级获得列表


export const fetchList = (data) => axiosG(getProductAttrCateList, data);
export const createProductCate = (data) =>  axiosK(createProductCateApi, data);
export const updateProductCate = (data) => axiosM(editProductCateApi, data);
export const deleteProductCate = data => axiosD(deleteProductCateApi, data);
export const getProductCate = (data) => axiosG(getProductCateApi, data);
export const updateShowStatus = (data) => axiosM(updateShowStatusApi, data);
export const updateNavStatus = (data) => axiosM(updateNavStatusApi, data);
export const fetchListWithChildren = (data) => axiosG(fetchListWithChildrenApi, data);
