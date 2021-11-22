import {axiosG, axiosK} from "./request";

const getCode = "admin/login/getCode"; // 获取验证码
const login = "admin/login/login"; // 登陆

export const getCodeApi = () => axiosG(getCode);
export const loginApi = data => axiosK(login, data);
