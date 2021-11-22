import {axiosG, axiosM} from "./request";

const fetchListApi= "/product/getSkuStockByProductId"; //通过商品id获得SKU库存
const updateApi= "/product/editSkuStock"; // 编辑SKU库存



export const fetchList = (data) => axiosG(fetchListApi, data);
export const update = (data) => axiosM(updateApi, data);

