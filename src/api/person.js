import {axiosD, axiosG, axiosK} from "./request";

const getUser = "admin/login/getUserInfo"; // 获取用户信息
const logout = "admin/login/logout"; // 退出登录
const updatePass = "test/updatePass"; // 修改密码
const getUserLog = "log/pageUserLog"; // 个人日志

export const getUserInfoApi = () => axiosG(getUser);
export const logoutApi = () => axiosD(logout);
export const updatePassApi = data => axiosK(updatePass, data);
export const getUserLogApi = data => axiosG(getUserLog, data);
