import {ajax} from "../index";


//留言删除
export const deleteMassage = (data)=>ajax("/api/backStage/deleteTheMessage",data,"post");

//获取留言
export const getMassage = (data)=>ajax("/api/home/getLeaveAMessage",data);

//评论获取
export const getAllComment = (data)=>ajax("/api/home/getAllComment",data);

//评论删除
export const deleteComment = (data)=>ajax("/api/backStage/deleteComment",data,"post");

//轮播图删除
export const deleteSlideShowImg = (data)=>ajax("/api/upload/deleteSlideShowImg",data,"post");

//上传
export const uploadImg = (data)=>ajax("/api/upload/uploadImg",data,"post");
