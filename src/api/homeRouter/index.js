import {ajax} from "../index"


//登录接口
export const login = (data)=>ajax("/api/LogAndReg/login",data,"post");

//注册接口
export const register = (data)=>ajax("/api/LogAndReg/register",data,"post");

//获取留言
export const getLMessage = (data)=>ajax("/api/home/getLeaveAMessage",data);

//获取首页其他的数据
export const getPageData = ()=>ajax("/api/home/homePageData");

//获取相册馆数据
export const getNotesData = ()=>ajax("/api/home/StudyNotesData");

//获取相册相片数据
export const getPhotoList = (data)=>ajax("/api/home/StudyNotesOneData",data);
 
//获取用户数据
export const getUserInfo = ()=>ajax("/api/home/imageInformation");

//退出接口
export const userQuit = ()=>ajax("/api/home/quit");

//获取学习馆数据
export const getArticleDetails = (classId,data)=>ajax(`/api/home/study/${classId}`,data);

//获取友链馆数据
export const getBreadCrumb = ()=>ajax("/api/home/breadCrumb");

//获取个人馆日记
export const getDiaryData = ()=>ajax("/api/home/personalDiaryData");

//添加留言
export const addLeaveAMessage = (data)=>ajax("/api/home/handelLeaveAMessage",data,"post");

//文章数据
export const getArticle = (data)=>ajax("/api/home/getArticle",data);

//获取评论数据
export const getCommentList = (data)=>ajax("/api/home/getComment",data);

//添加评论
export const addComment = (data)=>ajax("/api/home/addComment",data,"post");

//修改用户名
export const updateUsername = (data)=>ajax("/api/home/headToModify",data,"post");

//修改密码
export const updatePassword = (data)=>ajax("/api/home/changePassword",data,"post");

//修改头像
export const updateHeadPortrait  = (data)=>ajax("/api/home/nicknameChange",data,"post");
