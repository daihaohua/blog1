<template id="">
    <div class="personalDiary">
        <BreadCrumb :breadCrumb="breadCrumb"/>
        <ul class="clearfix">
            <li
                    class="clearfix"
                    v-for="(item,index) in personalDiaryData"
                    :key="index"
            >
                <div class="technology-head-portrait">
                    <el-avatar
                            :size="100"
                            :src="item.headPortrait">
                    </el-avatar>
                </div>
                <div class="technology-diary">
                    <p>
                       {{item.say}}
                        <el-tag
                                type=""
                                class="tag"
                                effect="dark"
                        >
                            {{new Date(item.created).toLocaleDateString()}}
                        </el-tag>
                    </p>
                </div>
            </li>
        </ul>

    </div>
</template>

<script>
    import {ajax} from "../../api"
    export default {
        name: "index",
        data(){
            return{
                breadCrumb:["个人日记"],
                personalDiaryData:[]
            }
        },
        async activated(){
            let {data} = await ajax("/api/home/personalDiaryData");
            this.personalDiaryData = data;
        },
    }
</script>

<style scoped lang="scss">
    .personalDiary{
        padding:100px ;
        background-color: #fff;
        ul{
            font-family: STKaiti;
            font-size: 20px;
            li{
                .technology-head-portrait{
                    float: left;
                    width: 100px;
                    height: 100px;
                    margin: 20px ;
                }
                .technology-diary{
                    position: relative;
                    float: right;
                    width: 75%;
                    height:100px;
                    background-color: #ccc;
                    border-radius: 50px 10px 10px 50px;
                    cursor: pointer;
                    transition: 0.5s;
                    p{
                        position: relative;
                        width:650px;
                        height: 100%;
                        text-indent: 36px;
                        margin-left: 100px;
                        font-size: 18px;
                        .tag{
                            position: absolute;
                            bottom: 0;
                            right: -25px;
                            font-size: 18px;
                            text-indent: 0;
                        }
                    }
                }
                .technology-diary:after{
                    content: "";
                    position: absolute;
                    left: -20px;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    width: 0;
                    height: 0;
                    border: 40px solid #ccc;
                    border-color: transparent #ccc transparent transparent;
                    border-left: none;
                }
                .technology-diary:hover{
                    margin-right:50px;
                }
            }
        }
    }
</style>