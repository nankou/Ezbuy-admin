import {axiosD, axiosG, axiosK, axiosP} from "@/api/request";

const addJob = "admin/job/addJob"; // 新增职业
const deleteJob = "admin/job/delJob"; // 删除职业
const editJob = "admin/job/editJob"; // 编辑职业
const getJobListPage = "admin/job/pageJob"; // 分页获得职业列表
const getJobByDeptId = "admin/job/listJob"; // 新增职业名列表（模糊搜索职业名）

export const addJobApi = data => axiosK(addJob, data);
export const deleteJobApi = data => axiosD(deleteJob, data);
export const editJobApi = data => axiosP(editJob, data);
export const getJobListApi = data => axiosG(getJobListPage, data);
export const getJobByDeptIdApi = data => axiosG(getJobByDeptId, data);
