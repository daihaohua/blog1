import {ajax} from "../index";
//
//文章删除操作
export const articlePages = (data)=>ajax("/api/backStage/DeleteArticles",data,"post");

//文章添加操作
export const addArticle = (data)=>ajax("/api/backStage/theArticleToAdd",data,"post");

//文章修改操作
export const updateArticle= (data)=>ajax("/api/backStage/reviseAnEssay",data,"post");