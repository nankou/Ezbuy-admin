import {axiosF, axiosFs} from "./request";

/**
 * @module 图片
 * */
const uploadPicture = 'file/uploadPictureFile';

export const uploadPictureApi = data => axiosF(uploadPicture, data);
export const uploadPicturePlusApi = data => axiosFs(uploadPicture, data);

/**
 * @module 音频
 * */
const uploadAudio = 'file/uploadAudioFile';

export const uploadAudioApi = data => axiosF(uploadAudio, data);
export const uploadAudioPlusApi = data => axiosFs(uploadAudio, data);

/**
 * @module 视频
 * */
const uploadVideo = 'file/uploadVideoFile';

export const uploadVideoApi = data => axiosF(uploadVideo, data);
export const uploadVideoPlusApi = (data, callback, source) => axiosFs(uploadVideo, data, callback, source);

/**
 * @module 文档
 * */
const uploadDocuments = 'file/uploadDocumentsFile';

export const uploadDocumentsApi = data => axiosF(uploadDocuments, data);
export const uploadDocumentsPlusApi = data => axiosFs(uploadDocuments, data);
