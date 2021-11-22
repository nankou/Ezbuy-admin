import {axiosG} from "@/api/request";

const getErrorDetailById = "log/getErrorDetail"; // 通过id获得报错信息的详情
const getErrorLog = "log/pageErrorLog"; // 获得报错日志
const getLogList = "log/pageLog"; // 分页获得日志列表

export const getErrorDetailByIdApi = data => axiosG(getErrorDetailById, data);
export const getErrorLogApi = data => axiosG(getErrorLog, data);
export const getLogListApi = data => axiosG(getLogList, data);
