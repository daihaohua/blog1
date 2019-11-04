import Vue from 'vue'
import Router from 'vue-router'
// 首页组件
const  Home = () => import('./views/home/Home.vue');
const  Homes = () => import('./views/home/Homes.vue');
// 学习心得组件
const  StudyNotes = () => import('./views/StudyNotes/');
// 技术组件
const  Technology = () => import('./views/technology/');
// 关于我组件
const  About = () => import('./views/about/');
// 个人日记
const  PersonalDiary = () => import('./views/personalDiary/');
// 文章组件
const  TheArticleDetails = () => import('./views/theArticleDetails/');
// 关联组件
const  BlogRoll = ()=> import('./views/blogRoll/');
//登录组件
const  Login = ()=> import('./views/LoginAndRegistration/Login');
// 注册组件
const  Register = ()=> import('./views/LoginAndRegistration/Register.vue');
//后台组件
const  BackStage = ()=> import('./views/BackStage/');
//用户管理组件
const  UserManagement = ()=> import('./views/admin/UserManagement');
//评论管理组件
const  Comments = ()=> import('./views/admin/Comments');
//图片管理组件
const  ImageManagement = ()=> import('./views/admin/ImageManagement');

// 查看分类组件
const  CheckTheClassification = ()=> import('./views/admin/CheckTheClassification');

// 添加分类组件
const  AddTheClassification = ()=> import('./views/admin/AddTheClassification');
// 查看文章组件
const  ToViewTheArticle = ()=> import('./views/admin/ToViewTheArticle');
// 添加文章组件
const  AddTheArticle = ()=> import('./views/admin/AddTheArticle');
// 添加友链添加组件
const  AddFriendsChain = ()=> import('./views/admin/AddFriendsChain');
// 查看友链组件
const  FriendChainShow = ()=> import('./views/admin/FriendChainShow');
// 日记管理组件
const  DiaryManagement = ()=> import('./views/admin/DiaryManagement');
// 添加日记管理组件
const  CheckTheDiary = ()=> import('./views/admin/CheckTheDiary');
//相册管理
//相册展示
const  ShowPhotoAlbum = ()=> import('./views/admin/ShowPhotoAlbum');

//相册添加
const  AddAPhotoAlbum = ()=> import('./views/admin/AddAPhotoAlbum');
//文章展示
const  TheArticleShows = ()=> import('./views/TheArticleShows');

//留言榜
const  LeaveAMessage = ()=> import('./views/LeaveAMessage');

//留言管理
const  MessageManagement = ()=> import('./views/admin/MessageManagement');

//个人中心
const  PersonalCenter = ()=> import('./views/personalCenter');
Vue.use(Router)

export default new Router({
  routes: [
      {
          path:"/",
          redirect:"/home"
      },
      {
        path:"/home",
        component: Home,
          children:[
              {
                  path:"",
                  name: 'homes',
                  component: Homes,
              },
              {
                  path:"/studyNotes",
                  name: 'studyNotes',
                  component: StudyNotes,
              },
              {
                  path:"/personalDiary",
                  name: 'personalDiary',
                  component: PersonalDiary,
              },
              {
                  path:"/about",
                  name: 'about',
                  component: About,
              },
              {
                  path:"/technology",
                  name: 'technology',
                  component: Technology,
              },
              {
                  path:"/blogRoll",
                  name: 'blogRoll',
                  component: BlogRoll,
              },
              {
                  path:"/study/:id",
                  name: 'theArticleDetails',
                  component: TheArticleDetails,
              },
              {
                  path:"theArticleShows",
                  name:"theArticleShows",
                  component:TheArticleShows,
              },
              {
                  path:"/leaveAMessage",
                  name:"leaveAMessage",
                  component:LeaveAMessage,
              },
              {
                  path:"/personalCenter",
                  name:"personalCenter",
                  component:PersonalCenter,
              },
          ]
      },
      {
          path:"/login",
          name:"login",
          component:Login
      },
      {
          path:"/register",
          name:"register",
          component:Register
      },
      {
          path:"/backStage",
          redirect:"/backStage/userManagement"
      },
      {
          path:"/backStage",
          name:"backStage",
          component:BackStage,
          children:[
              {
                  path:"userManagement",
                  name:"userManagement",
                  component:UserManagement,
              },
              {
                  path:"comments",
                  name:"comments",
                  component:Comments,
              },
              {
                  path:"imageManagement",
                  name:"imageManagement",
                  component:ImageManagement,
              },
			  
			  {
			      path:"checkTheClassification",
			      name:"checkTheClassification",
			      component:CheckTheClassification,
			  },
			  {
			      path:"addTheClassification",
			      name:"addTheClassification",
			      component:AddTheClassification,
			  },
			  {
			      path:"toViewTheArticle",
			      name:"toViewTheArticle",
			      component:ToViewTheArticle,
			  },
			  {
			      path:"addTheArticle",
			      name:"addTheArticle",
			      component:AddTheArticle,
			  },
              {
                  path:"addFriendsChain",
                  name:"addFriendsChain",
                  component:AddFriendsChain,
              },
              {
                  path:"diaryManagement",
                  name:"diaryManagement",
                  component:DiaryManagement,
              },
              {
                  path:"checkTheDiary",
                  name:"checkTheDiary",
                  component:CheckTheDiary,
              },
              {
                  path:"friendChainShow",
                  name:"friendChainShow",
                  component:FriendChainShow,
              },
              {
                  path:"showPhotoAlbum",
                  name:"showPhotoAlbum",
                  component:ShowPhotoAlbum,
              },
              {
                  path:"addAPhotoAlbum",
                  name:"addAPhotoAlbum",
                  component:AddAPhotoAlbum,
              },
              {
                  path:'messageManagement',
                  name:'messageManagement',
                  component:MessageManagement
              }
          ]
      }
  ]
})
