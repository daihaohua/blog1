import {ajax} from "../index";


//上下页切换路由
export const classPages = (data)=>ajax("/api/backStage/checkTheClassification",data,"get");

//分类删除
export const classDelete = (data)=>ajax("/api/backStage/classificationDelete",data,"post");

//分类修改
export const classUpdate = (data)=>ajax("/api/backStage/classificationUpdate",data,"post");

//添加分类
export const addClass = (data)=>ajax("/api/backStage/addTheClassification",data,"post");
