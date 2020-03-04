import {ajax} from "../index";

//获取分类数据
export const getClass = (data)=>ajax("/api/backStage/checkTheClassification",data);

//获取文章数据
export const getArticle = (data)=>ajax("/api/backStage/toViewTheArticle",data)

//获取文章分类数据
export const getArticleClass = ()=>ajax("/api/backStage/theArticleClassification")
//获取后台友链数据
export const getLink = (data)=>ajax("/api/backStage/forALink",data)

//获取后台日记数据
export const getDiary = (data)=>ajax("/api/backStage/toObtainADiary",data);

export const getPhotoA = ()=>ajax("/api/upload/getPhoto");

//获取相册数据
export const getPhotoAlbumA = (data)=>ajax("/api/backStage/getPhotoAlbum",data)

export const getPhotoAlbumDataA = (data)=>ajax("/api/backStage/photoAlbumData",data)