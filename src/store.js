import Vue from 'vue'
import Vuex from 'vuex'
import {
        getClass,
        getArticle,
        getArticleClass,
        getLink,
        getDiary,
        getPhotoA,
        getPhotoAlbumA,
        getPhotoAlbumDataA} from "./api/adminRouter/getAdminData"

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
        user:{
            headPortrait:'',
            isAdmin:'',
            username:''
        },
	    BackStageDatas:[],
        categoricalData:[],
        theArticleClassification:[],
        articleData:{},
        forALinkData:{},
        diaryData:{},
        getPhotoData:[],
        getPhotoAlbumData:{},
        photoAlbumData:[]
  },
  mutations: {
    userInfos(state,user){
        state.user = user;
    },
	BackStageData(state,BackStageDatas){
		 state.BackStageDatas = BackStageDatas;
	},
      categoricalData(state,categoricalData){
          state.categoricalData = categoricalData;
      },
      theArticleClassification(state,theArticleClassification){
          state.theArticleClassification = theArticleClassification;
      },
      articleData(state,articleData){
          state.articleData = articleData;
      },
      forALinkData(state,forALinkData){
          state.forALinkData = forALinkData;
      },
      diaryData(state,diaryData){
          state.diaryData = diaryData;
      },
      getPhotoData(state,getPhotoData){
          state.getPhotoData = getPhotoData;
      },
      getPhotoAlbumData(state,getPhotoAlbumData){
        state.getPhotoAlbumData =getPhotoAlbumData;
      },
      photoAlbumData(state,photoAlbumData){
          state.photoAlbumData =photoAlbumData;
      },

  },
  actions: {
      //获取后台分类数据
      async getCategoricalData({commit},pages) {
        
        let {data} = await getClass({pages});
        commit("categoricalData",data);
      },
      //获取后台文章分类数据
      async theArticleClassification({commit}) {
          let {data} = await getArticleClass();
          commit("theArticleClassification",data);
      },
      //获取后台文章数据
      async articleData({commit},pages) {
          let {data} = await getArticle({pages});
          commit("articleData",data);
      },
      //获取后台友链数据
      async forALink({commit},pages) {
          let {data} = await getLink({pages});
          commit("forALinkData",data);
      },
      //获取后台日记数据
      async diary({commit},pages) {
          let {data} = await getDiary({pages});
          commit("diaryData",data);
      },
      //获取相册数据
      async getPhoto({commit}) {
          let {data} = await getPhotoA();
          commit("getPhotoData",data);
      },
      async getPhotoAlbum({commit},pages) {
          let {data} = await getPhotoAlbumA({pages});
          commit("getPhotoAlbumData",data);
      },
      async photoData({commit},PhotoAlbumId) {
          let {data} = await getPhotoAlbumDataA({PhotoAlbumId});
          commit("photoAlbumData",data);
      },

  }
})
