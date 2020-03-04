<template id="">
    <div class="lonGin" >
        <el-dropdown 
            trigger="click"  
            @command="handleCommand">
                <span>
                    <el-avatar
                        :size="50"
                        :src="user.headPortrait">
                    </el-avatar>
                </span>
                <el-dropdown-menu slot="dropdown"
                >
                    <el-dropdown-item
                            icon="el-icon-user-solid"
                            command="personalCenter"
                            v-if="user.username"
                    >个人中心</el-dropdown-item>
                    <el-dropdown-item
                            icon="el-icon-user-solid"
                            command="backStageManagement"
                            v-if="user.isAdmin"
                    >后台管理</el-dropdown-item>
                    <el-dropdown-item
                            icon="el-icon-user-solid"
                            v-if="user.username"
                            command="quit">退出</el-dropdown-item>
                    <el-dropdown-item
                            icon="el-icon-user-solid"
                            command="login"
                            v-if="!user.username"
                    >登录/注册</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        <div class="user">{{user.username}}</div>
    </div>
</template>

<script>
    import {userQuit} from "../../api/homeRouter"
    export default {
        name: "LonginAndRed",
        props:["user"],
        methods:{
            async handleCommand(command) { //退出操作
                if(command === "quit"){
                    let {data} = await  userQuit();
                    if(!data.username){
                    let quit = {
                            headPortrait:'',
                            isAdmin:'',
                            username:''
                        }
                    this.$store.commit("userInfos",quit);
                    this.$router.push("/");
                    }
                    return false;
                }else if(command === 'personalCenter'){
                    this.$router.push("/personalCenter");
                }else if(command === 'login') {
                    this.$router.replace({name:"login"})
                }else{
                    this.$router.push("/backStage/userManagement");
                }

            },
        }
    }
</script>

<style scoped lang="scss">
   .lonGin{
       height: 50px;
       background-color: rgb(84, 92, 100);
       padding: 15px;
   }
   .el-dropdown-link {
       cursor: pointer;
       color: #409EFF;
   }
   .el-icon-arrow-down {
       font-size: 12px;
   }
   .demonstration {
       display: block;
       color: #8492a6;
       font-size: 14px;
       margin-bottom: 20px;
   }
    .user{
        display: inline-block;
        font-size: 20px;
        color: #fff;
        margin-top: -30px;
    }
</style>