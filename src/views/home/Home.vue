<template>
    <div id="home">
        <el-backtop></el-backtop>
        <div class="homes">
            <!--导航部分-->
            <div class="nav-list">
                <el-row>
                    <!--logo-->
                    <el-col :span="4">
                        <div class="grid-content bg-purple">
                            <Logo />
                        </div>
                    </el-col>
                    <!--导航-->
                    <el-col :span="14">
                        <div class="grid-content bg-purple-light">
                            <nav-left :classData="classData"></nav-left>
                        </div>
                    </el-col>
                    <!--登录-->
                    <el-col :span="6">
                        <div class="grid-content bg-purple-light">
                            <longin-and-red :user="user"></longin-and-red>
                        </div>
                    </el-col>
                </el-row>
            </div>

            <!--主体部分-->

            <div id="subject">
                <keep-alive>
                    <router-view />
                </keep-alive>
            </div>
        </div>
    </div>
</template>

<script>
    import Logo from "../../components/Logo/index"
    import NavLeft from "../../components/Nav/NavLeft"
    import LonginAndRed from "../../components/longinandreg/LonginAndRed"
    import {ajax} from "../../api"
    export default {
        name: "Home",
        data() {
            return {
                user:{},
                classData:[]
            };
        },
        async activated(){
            let {data} = await  ajax("/api/home/imageInformation","get");
            this.user  = data.userInfo;
            this.classData = data.ClassIfysData;
            this.$store.commit("userInfos",data.userInfo);
        },
        computed:{
            headPortrait(){
                return this.$store.state.user
            }
        },
        watch:{
            headPortrait(user){
                this.user = user;
            }
        },
        components:{
            Logo,
            NavLeft,
            LonginAndRed,
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
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .nav-list{
        margin-bottom: 20px;
    }
    #home{
        margin-bottom: 30px;
    }
    .banner{
        height:100px;
        background-color: orangered;
    }
    #subject{
        width:1200px;
        margin: auto;
    }
    .content-right{
        height: 400px;
    }
    .particularly-recommend{
        height: 600px;
        font-size: 20px;
    }
    .latest-release{
        height: 600px;
        font-size: 20px;
    }
</style>