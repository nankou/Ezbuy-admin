import {axiosG, axiosK, axiosD,axiosM} from "./request";

const fetchListGetApi= "brand/pageBrand"; //  分页获得品牌
const deleteBrandApi =  "/brand/delBrand"; // 删除品牌
const updateShowStatusApi = "/brand/editShowStatus"; // 批量更改显示状态
const updateFactoryStatusApi = "/brand/editFactoryStatus"; // 批量更改厂家制造商状态
const createBrandApi = "/brand/addBrand"; // 添加品牌
const updateBrandApi = "/brand/editBrand"; // 更改品牌
const getBrandApi = "/brand/getBrand"; // 获得品牌详情
const getProductApi = "/brand/getBrandName"; // 获得品牌名字列表


export const fetchList = (data) => axiosG(fetchListGetApi, data);
export const deleteBrand = (data) => axiosD(deleteBrandApi, data);
export const updateShowStatus = (data) => axiosM(updateShowStatusApi, data);
export const updateFactoryStatus = (data) => axiosM(updateFactoryStatusApi, data);
export const createBrand = (data) =>  axiosK(createBrandApi, data);
export const updateBrand = (data) =>  axiosK(updateBrandApi, data);
export const getBrand = (data) =>  axiosG(getBrandApi, data);
export const getProduct = (data) =>  axiosG(getProductApi, data);



