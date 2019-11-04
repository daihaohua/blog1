<template id="">
    <div class="popular-articles">
        <h3 class="subtitle">
            <i class="el-icon-position"></i>点击排行
        </h3>
        <ul class="clearfix">
                <li
                        v-for="(item,index) in rankingList"
                        :key="index"
                        @click="handelClick(item._id)"
                >
                    <span class="ranking">{{index+1}}</span>
                    <p>{{item.title}}</p>
                    <span class="item">{{item.reading}}</span>
                </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: "index",
        props:['rankingList'],
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
    .popular-articles{
        margin-bottom: 20px;
        background: #fff;
        border-radius:10px;
        .subtitle{
            border-bottom: 1px solid #ccc;
            padding: 10px;
            border-left: 3px solid blue;
        }
        ul{
            li{
                height: 40px;
                padding: 10px 0;
                transition: 0.5s;
                cursor: pointer;
                border-bottom:1px solid #ccc;
                margin-left: 10px;
                position: relative;
                &:hover{
                    background-color: skyblue;
                }
                .item{
                    position: absolute;
                    right: 0;
                    top:0;
                    width: 20px;
                    line-height: 20px;
                    text-align: center;
                    border-radius: 50%;
                    background-color: red;
                    color: #f4f4f4;
                    font-size: 10px;
                    font-weight: bold;
                }
                .ranking{
                    float: left;
                    display: block;
                    width: 40px;
                    line-height: 40px;
                    text-align: center;
                    background-color: orange;
                    font-size: 22px;
                    font-weight: bold;
                    color:#fff;
                    border-radius: 50%;
                }
                p{
                    float: left;
                    margin-left: 10px;
                    line-height: 40px;
                    font-weight: bold;
                    font-size: 18px;
                }
            }
        }
    }
    .item {
        margin-top: 10px;
        margin-right: 40px;
    }
</style>