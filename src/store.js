import Vue from 'vue'
import Vuex from 'vuex'
import {ajax} from "./api"

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
          let {data} = await ajax("/api/backStage/checkTheClassification",{pages});
          console.log(data)
              commit("categoricalData",data);
      },
      //获取后台文章分类数据
      async theArticleClassification({commit}) {
          let {data} = await ajax("/api/backStage/theArticleClassification");
          commit("theArticleClassification",data);
      },
      //获取后台文章数据
      async articleData({commit},pages) {
          let {data} = await ajax("/api/backStage/toViewTheArticle",{pages});
          commit("articleData",data);
      },
      //获取后台友链数据
      async forALink({commit},pages) {
          let {data} = await ajax("/api/backStage/forALink",{pages});
          commit("forALinkData",data);
      },
      //获取后台日记数据
      async diary({commit},pages) {
          let {data} = await ajax("/api/backStage/toObtainADiary",{pages});
          commit("diaryData",data);
      },
      async getPhoto({commit}) {
          let {data} = await ajax("/api/upload/getPhoto");
          commit("getPhotoData",data);
      },
      async getPhotoAlbum({commit},pages) {
          let {data} = await ajax("/api/backStage/getPhotoAlbum",{pages});
          commit("getPhotoAlbumData",data);
      },
      async photoData({commit},PhotoAlbumId) {
          let {data} = await ajax("/api/backStage/photoAlbumData",{PhotoAlbumId});
          console.log(data);
          commit("photoAlbumData",data);
      },

  }
})
