import {ajax} from "../index";

//相册删除操作
export const deletePhoto= (data)=>ajax("/api/backStage/deletePhotoAlbum",data,"post");

//相册添加照片
export const addPhotoList= (data)=>ajax("/api/backStage/photoAlbumDelete",data,"post");
