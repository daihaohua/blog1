<template id="">
    <div class="blogRoll">
        <BreadCrumb :breadCrumb="breadCrumb"/>
        <div class="latest-particulars clearfix" >
            <ul class="clearfix">
                <li
                        v-for="(item,index) in breadCrumbData"
                        :key="index"
                       @click="go(item.AFriendLink)"
                >
                    <div class="latest-img">
                        <el-avatar
                                shape="square"
                                :size="60"
                                fit="fill"
                                :src="item.headPortrait"></el-avatar>
                    </div>
                    <div class="latest-content">
                        <h4>{{item.linksName}}</h4>
                        <p>{{item.describe}}</p>
                        <p>{{new Date(item.created).toLocaleDateString()}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {ajax} from "../../api"
    export default {
        name: "index",
        data(){
            return{
                breadCrumb:["友情链接"],
                breadCrumbData:[]
            }
        },
        async activated(){
            let {data} = await ajax("/api/home/breadCrumb");
            this.breadCrumbData = data;
        },
        methods:{
            go(AFriendLink){
                window.location.href = AFriendLink;
            }
        }
    }
</script>

<style scoped lang="scss">
    .blogRoll{
        padding:100px;
        background-color: #fff;
        height: 50vh;
            .latest-particulars{
                border-radius: 6px;
                ul{
                    font-family: STKaiti;
                    font-size: 20px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    align-content: center;
                    li{
                        border:1px solid #ccc;
                        width: 340px;
                        height: 100%;
                        padding:10px 10px;
                        margin: 10px;
                        cursor: pointer;
                        transition:0.5s;
                        .latest-img{
                            float: left;
                            width: 70px;
                            height: 70px;
                        }
                        &:hover{
                            background-color: skyblue;
                            box-shadow: 0 0 30px skyblue;
                        }
                    }

                }

            }
    }
</style>