import {axiosG, axiosK,axiosD} from "./request";

const findCarousel= ""; // 根据id查找轮播图
const deleteCarousel= "/picture/delPicture"; //批量删除轮播图
const getCarouselList = "/picture/listPicture"; // 获取展示轮播图列表
const addCarousel = "/picture/addPicture"; // 新增轮播图
const editCarousel = "/picture/addPicture"; // 修改轮播图

export const slideShowFindApi = (data) => axiosG(findCarousel, data);
export const slideShowDelApi = data => axiosD(deleteCarousel , data);
export const slideShowGetApi = (data) => axiosG(getCarouselList, {type:1});
export const slideShowAddApi = (data) => axiosK(addCarousel, data);
export const slideShowUpdateApi = (data) => axiosK(editCarousel, data);