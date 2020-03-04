import {ajax} from "../index"

//上下页切换路由
export const userPages = (data)=>ajax("/api/backStage/userManagement",data,"get");

//用户删除
export const userDetele = (data)=>ajax("/api/backStage/userManagement",data,"get");