import {axiosG, axiosK,axiosD,axiosA,axiosM} from "./request";

const getProductAttrCateList= "/productType/pageProductType"; // 分页获取商品类型列表
const createProductAttrCateApi= "/productType/addProductType"; // 添加商品类型
const editProductAttrCateApi= "/productType/editProductType"; // 更改商品类型
const deleteProductAttrCateApi= "/productType/delProductType"; // 删除商品类型


export const fetchList = (data) => axiosG(getProductAttrCateList, data);
export const createProductAttrCate = (data) =>  axiosK(createProductAttrCateApi, data);
export const updateProductAttrCate = (data) => axiosM(editProductAttrCateApi, data);
export const deleteProductAttrCate = data => axiosD(deleteProductAttrCateApi, data);


