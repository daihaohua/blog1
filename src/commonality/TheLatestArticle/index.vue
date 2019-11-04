<template id="">
    <div>
        <slot />
        <div class="active clearfix"
             v-for="(item,index) in articleDate"
             :key="index"
             @click="handelClick(item._id)"
        >
            <div class="article-img">
                <img :src="item.paging" width="100%" height="100%">
            </div>
            <div class="article-content">
                <h3>{{item.title}}</h3>
                <div class="content">
                    <ul class="clearfix">
                        <li>
                            <el-avatar size="large" class="portrait"
                                       :src="item.authorId.headPortrait">
                            </el-avatar>
                            <span class="user-name">{{item.authorId.username}}</span>
                        </li>
                        <li>
                            <i class="iconFont el-icon-s-management"></i>
                            <span>{{item.classId.classify}}</span>
                        </li>
                        <li>
                            <i class="iconFont el-icon-medal"></i>
                            <span>{{item.reading}}</span>
                        </li>
                        <li>
                            <i class="iconFont el-icon-thumb"></i>
                            <span>{{item.hits}}</span>
                        </li>
                        <li>
                            <i class="iconFont el-icon-time"></i>
                            <span>{{new Date(item.created).toLocaleDateString()}}</span>
                        </li>
                    </ul>
                </div>
                <div class="describe">
                    <p>{{item.describe}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        props:["articleDate"],
        methods:{
            handelClick(_id){
                this.$router.push({
                    name:"theArticleShows",
                    query:{_id}
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .clearfix:after{
        display:block;
        content:"";
        clear:both;
    }
    .subtitle{
        border-bottom: 1px solid #ccc;
        padding: 10px;
        border-left: 3px solid blue;
    }
    .active{
        padding: 15px;
        background-color: #fff;
        border-radius: 4px;
        transition:0.5s;
        cursor: pointer;
        margin-top: 20px;
        &:hover{
            box-shadow: 1px 6px 30px #ccc;
            border-bottom: 2px solid deepskyblue;
        }
        &:hover img{
            transform: scale(1.1);
        }
        .article-img{
            float: left;
            width: 29%;
            height: 170px;
            box-sizing: border-box;
            overflow:hidden;
            font-size: 0;
            text-indent: 0;
            img{
                transition:0.5s;
            }
        }
        .article-content{
            float: right;
            width: 69%;
            height: 170px;
            h3{
                padding: 8px 0;
            }
            .content{
                ul{
                    li{
                        float: left;
                        margin-right: 20px;
                        line-height: 40px;

                        span{
                            vertical-align: middle;
                            font-size: 15px;
                            font-weight: 700;
                        }
                        .iconFont{
                            font-size: 20px;
                            vertical-align: middle;
                            margin-right: 5px;
                        }
                    }
                }
            }
            .describe{
                margin-top: 5px;
                p{
                    font-size: 16px;
                }
            }
        }
    }
</style>