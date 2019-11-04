<template>
    <div id="home">
        <!--主体左侧文章部分-->
        <el-row>
            <el-col :span="24">
                <SlideShow :slideShowData="slideShowData" />
            </el-col>
        </el-row>
        <!--主体右侧-->
        <el-row :gutter="20">
            <el-col :span="17">
                <div class="grid-content bg-purple">
                    <!--特别推荐-->
                    <div class="particularly-recommend">
                        <Swiper />
                    </div>

                    <!--最新发布-->
                    <div class="latest-release">
                        <div class="article">
                            <TheLatestArticle :articleDate="articleDate">
                                <h3 class="subtitle">
                                    <i class="el-icon-position"></i>最新文章
                                </h3>
                            </TheLatestArticle>
                        </div>
                    </div>
                </div>
            </el-col>
            <!--右侧-->
            <el-col :span="7">
                <div class="grid-content bg-purple">
                    <!--点击排行-->
                    <PopularArticles :rankingList="rankingList"/>

                    <!--最新评论-->
                    <Latest :LeaveAMessageData="LeaveAMessageData"/>

                    <!--一路走来-->
                    <div class="content-right">
                        <div class="content-right">
                            <h3 class="subtitle"><i class="el-icon-position"></i>一路走来</h3>
                        </div>
                    </div>

                    <!--友情链接-->
                    <Friendship :listOfFriendship="listOfFriendship"/>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import SlideShow from "@/components/switch/SlideShow"
    import PopularArticles from "@/components/popularArticles"
    import Latest from "@/components/popularArticles/Latest"
    import Swiper from "@/components/swiper";
    import TheArticleDetails from "../theArticleDetails/index";
    import Friendship from "@/components/Friendship";
    import {ajax} from "../../api"
    export default {
        name: "Homes",
        data(){
            return{
                slideShowData:[],
                articleDate:[],
                LeaveAMessageData:[],
                rankingList:[],
                listOfFriendship:[]
            }
        },
        async activated(){
            let {data}  = await ajax("http://47.101.135.0:3000/home/homePageData");
            // let {data} = await ajax("/api/home/homePageData");
            console.log(data);
            this.slideShowData = data.SlideShowData;
            this.articleDate = data.ArticleData;
            this.LeaveAMessageData = data.LeaveAMessageData;
            this.rankingList = data.rankingList;
            this.listOfFriendship = data.listOfFriendship;
        },
        components:{
            TheArticleDetails,
            SlideShow,
            PopularArticles,
            Swiper,
            Latest,
            Friendship
        }
    }
</script>

<style scoped lang="scss">
    .grid-content[data-v-fae5bece]{
        min-height:80px;
    }
    .el-row {
        margin-bottom: 20px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .banner{
        height:100px;
    }
    #subject{
        width:1300px;
        margin: auto;
    }
    .particularly-recommend{
        font-size: 20px;
    }
    .latest-release{
        font-size: 20px;
        margin-top: 35px;
        .article{
            border-radius:6px;
            font-size: 20px;
            text-indent: 10px;
        }
    }
    .article-contents{
        padding: 10px;
    }
    .subtitle{
        border-bottom: 1px solid #ccc;
        padding: 10px;
        border-left: 3px solid blue;
        background-color: #fff;
    }
</style>