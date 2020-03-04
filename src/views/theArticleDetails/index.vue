<template id="">
    <div id="TheArticleDetails">
        <bread-crumb :breadCrumb="breadCrumb"/>
        <the-latest-article :articleDate="articleDate" />
        <button-btn 
            v-show="articleDate.length >= 10"
            :page="page" 
            :maxPage="maxPage"
            @previous = "previous"
            @next = "next"
        />
        <div v-show="articleDate.length === 0">
            <h3>该分类还没有文章数据请联系管理员添加文章；</h3>
        </div>
    </div>
</template>

<script>
    import {getArticleDetails} from "../../api/homeRouter";
    export default {
        name: "TheArticleDetails",
        data(){
            return{
                breadCrumb:["学习馆"],
                articleDate:[],
                page:1,
                maxPage:1
            }
        },
        methods:{
            previous(){
                let pages = this.page - 1;
                this.getClassifyArticle(pages);
            },
            next(){
                let pages = this.page + 1;
                this.getClassifyArticle(pages);
            },
            async getClassifyArticle(pages){
                let classId =  this.$route.params.id;
                
                let {data} = await getArticleDetails(classId,pages);
                this.page = data.page;
                this.maxPage = data.maxPage;
                this.articleDate = data.categoryData;
            }
        },
        watch:{
            async $route(){
                let judge =  this.$route.path;
                let reg = new RegExp(/\/study\//);
                if(reg.test(judge)){
                   this.getClassifyArticle();
                }
            }
        },
        async activated(){
          this.getClassifyArticle();
        }
    }
</script>

<style scoped lang="scss">
    #TheArticleDetails{
        position: relative;
        padding: 100px 60px;
        background-color: #fff;
        #button-left,#button-right{
            float:left;
            margin-top:20px;
        }
        #button-right{
            float:right;
        }
        #pages{
            position: absolute;
            left:0;
            bottom:0;
            right: 0;
            margin:auto;
            line-height:70px;
            text-align:center;
            font-size: 20px;
        }
    }
</style>