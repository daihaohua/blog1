<template id="">
    <div class="TheArticleShows">
        <h2>{{articleDate.title}}</h2>
        <div class="header">
            <ul class="clearfix">
                <li>
                    时间:
                    <span v-text="new Date(articleDate.created).toLocaleDateString()" />
                </li>
                <li>
                    作者:
                    <span v-text="username" />
                </li>
                <li>
                    分类:
                    <span v-text="classify" />
                </li>
                <li>
                    阅读量:
                    <span>
                      {{articleDate.reading}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="content">
            <p v-html="articleDate.content" />
        </div>
        <div>
            <el-input
                    type="textarea"
                    :rows="8"
                    placeholder="请留言"
                    v-model="textArea">
            </el-input>
            <div class="clearfix">
                <el-button
                        type="primary"
                        class="leaveAMessage"
                        @click="handelClick()"
                >留言</el-button>
            </div>
            <div class="latest">
                <h3 class="subtitle"><i class="el-icon-position"></i>留言榜</h3>
                <div class="latest-particulars clearfix"
                     v-for="(item,index) in Comments"
                    :key="index"
                >
                    <div class="latest-img">
                        <el-avatar
                                shape="square"
                                :size="60"
                                fit="fill"
                                :src="item.headPortrait"></el-avatar>
                    </div>
                    <div class="latest-content">
                        <h4>{{item.username}}</h4>
                        <p>{{item.textArea}}</p>
                        <div>
                            <p class="created">{{new Date(item.created).toLocaleDateString()}}</p>
                        </div>
                    </div>
                </div>
            </div> 
            <button-btn 
				:page="page" 
				:maxPage="maxPage"
				@previous = "previous"
				@next = "next"
			/>
        </div>
    </div>
</template>

<script>
    import {getArticle,getCommentList,addComment} from "../../api/homeRouter"
    import {Message} from 'element-ui';
    export default {
        name: "index",
        data(){
            return{
                articleDate:{},
                textArea:'',
                username:'',
                classify:'',
                Comments:[],
                page:1,
                maxPage:1,
            }
        },
        async activated(){
            let _id = this.$route.query._id;
            let {data} = await getArticle({_id});
            this.articleDate = data;
            this.username=data.authorId.username;
            this.classify=data.classId.classify;
            this.getComment();
        },
        methods:{
            async handelClick(){ //添加评论
                let parameter = {};
                parameter.articleId = this.$route.query._id;
                parameter.classId = this.articleDate.classId;
                parameter.textArea = this.textArea;
                parameter.username = this.$store.state.user.username;
                parameter.headPortrait = this.$store.state.user.headPortrait;
                if(!parameter.username){
                    Message.error("你还没有登录,请先登录")
                    this.$router.push("/login");
                    return;
                }
                 if(!this.textArea){
                    Message.info("客官,不能为空哦！！！")
                    return;
                }
                
                let {data} = await addComment(parameter);
                if(!data.code){
                        Message({
                        type: data.type,
                        message: data.particulars
                    });
                    this.getComment();
                    this.textArea='';
                }
            },
            async getComment(pages){//获取评论数据
                let articleId = this.$route.query._id;
                if(articleId){
                    let {data} = await  getCommentList({pages,articleId});
                    let {CommentData,page,maxPage} = data;
                    // console.log(data);
                    this.Comments =  CommentData;
                    this.page = page;
                    this.maxPage = maxPage;
                }
            },
            previous(){
                let pages = this.page - 1;
                this.getComment(pages);
            },
            next(){
                let pages = this.page + 1;
                this.getComment(pages);
            }
        }
    }
</script>

<style lang="scss">
    .TheArticleShows{
        position: relative;
        padding: 100px;
        background-color: #fff;
        h2{
            text-align: center;
        }
        .header{
            line-height: 40px;
            border-top: 1px dashed black;
            border-bottom: 1px dashed black;
            ul{
                width: 600px;
                margin: auto;
                li{
                    float: left;
                    width: 150px;
                    height: 100%;
                    span{
                        text-indent: 5px;
                        font-weight: 600;
                    }
                }
            }
        }
        .content{
            padding: 20px 10px;
            p{
                /* table 样式 */
                table {
                    border-top: 1px solid #ccc;
                    border-left: 1px solid #ccc;
                }
                table td,
                table th {
                    border-bottom: 1px solid #ccc;
                    border-right: 1px solid #ccc;
                    padding: 3px 5px;
                }
                table th {
                    border-bottom: 2px solid #ccc;
                    text-align: center;
                }

                /* blockquote 样式 */
                blockquote {
                    display: block;
                    border-left: 8px solid #d0e5f2;
                    padding: 5px 10px;
                    margin: 10px 0;
                    line-height: 1.4;
                    font-size: 100%;
                    background-color: #f1f1f1;
                }
                /* code 样式 */
                code {
                    display: inline-block;
                    *display: inline;
                    *zoom: 1;
                    background-color: #f1f1f1;
                    border-radius: 3px;
                    padding: 3px 5px;
                    margin: 0 3px;
                }
                pre code {
                    display: block;
                }

                /* ul ol 样式 */
                ul, ol {
                    margin: 10px 0 10px 20px;
                }
            }
        }
        .leaveAMessage{
            float: right;
            width: 100px;
            margin-top: 20px;
        }
        .latest{
            background-color: #fff;
            border-radius: 6px;
            .subtitle{
                border-bottom: 1px solid #ccc;
                padding: 10px;
                border-left: 3px solid blue;
            }
            .latest-particulars{
                padding:10px 10px;
                border-top:1px solid #ccc;
                .latest-img{
                    float: left;
                    width: 70px;
                    height: 70px;
                }
                .latest-content{
                    div{
                        text-align: right;
                        .created{
                            display: inline-block;
                            font-weight: 700;
                            border-radius: 6px;
                            padding: 7px;
                            background-color: cornflowerblue;
                        }
                    }

                }
            }
        }
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