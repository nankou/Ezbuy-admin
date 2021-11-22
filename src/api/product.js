import {axiosG, axiosK, axiosD, axiosA, axiosM} from "./request";

const fetchListGetApi= "/product/pageProduct"; // 获取产品列表
const fetchSimpleListGetApi= "/product/simpleList"; //
const updateDeleteStatusApi =  "/product/delProduct"; // 删除商品
const updateRecommendStatusApi = "/product/editRecommendStatus"; // 更新推荐信息
const updateNewStatusApi = "/product/editNewStatus"; // 更新新品信息
const updatePublishStatusApi = "/product/editPublishStatus"; // 更新上架信息
const createProductApi = "/product/addProduct"; // 添加商品
const updateProductApi = "/product/editProduct"; // 编辑商品
const getProductApi = "/product/getProduct"; // 获取商品


export const fetchList = (data) => axiosG(fetchListGetApi, data);
export const fetchSimpleList = (data) => axiosG(fetchSimpleListGetApi, data);
export const updateDeleteStatus = (data) => axiosD(updateDeleteStatusApi, data);
export const updateNewStatus = (data) => axiosM(updateNewStatusApi, data);
export const updateRecommendStatus = (data) => axiosM(updateRecommendStatusApi, data);
export const updatePublishStatus = (data) => axiosM(updatePublishStatusApi, data);
export const createProduct = (data) =>  axiosK(createProductApi, data);
export const updateProduct = (data) =>  axiosK(updateProductApi, data);
export const getProduct = (data) =>  axiosG(getProductApi, data);

