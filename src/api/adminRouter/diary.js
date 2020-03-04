import {ajax} from "../index";

//日记删除删除操作
export const diaryPages = (data)=>ajax("/api/backStage/deleteTheDiary",data,"post");

//日记修改
export const updateDiary = (data)=>ajax('/api/backStage/modifyTheDiary',data,"post");

//日记添加
export const addDiary = (data)=>ajax("/api/backStage/addADiary",data,"post");

