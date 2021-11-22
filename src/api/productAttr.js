import {axiosG, axiosK,axiosD,axiosA,axiosM} from "./request";

const getProductAttrCateList= "/productAttribute/pageProductAttribute"; // 获取商品参数属性列表
const createProductAttrCateApi= "/productAttribute/addProductAttribute"; // 添加商品属性参数
const editProductAttrCateApi= "/productAttribute/editProductAttribute"; // 更改商品属性参数
const deleteProductAttrCateApi= "/productAttribute/delProductAttribute"; // 删除商品属性参数
const getProductAttrApi= "/productAttribute/getShopAttribute"; // 获得商品类型


export const fetchList = (data) => axiosG(getProductAttrCateList, data);
export const createProductAttr = (data) =>  axiosK(createProductAttrCateApi, data);
export const updateProductAttr = (data) => axiosM(editProductAttrCateApi, data);
export const deleteProductAttr = data => axiosD(deleteProductAttrCateApi, data);
export const getProductAttr = (data) => axiosG(getProductAttrApi, data);
