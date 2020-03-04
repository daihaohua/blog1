import {ajax} from "../index";

//删除友链信息
export const chainDelete = (data)=>ajax("/api/backStage/DeleteFriendsChain",data,"post");

//添加友链信息
export const addChain = (data)=>ajax("/api/backStage/friendsOfTheChain",data,"post");

