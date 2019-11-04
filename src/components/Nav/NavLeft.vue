<template id="">
    <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router>
        <el-menu-item index="/">
            <p class="nav">
                <i class="el-icon-s-home"></i>首页
            </p>
        </el-menu-item>
        <el-menu-item index="/studyNotes">
            <p class="nav">
                <i class="el-icon-notebook-2"></i>相册馆
            </p>
        </el-menu-item>
        <el-menu-item index="/personalDiary">
            <p class="nav">
                <i class="el-icon-notebook-1"></i>日记馆
            </p>
        </el-menu-item>
        <el-menu-item index="/about">
            <p class="nav">
                <i class="el-icon-info"></i>个人馆
            </p>
        </el-menu-item>
        <el-menu-item index="/blogRoll">
            <p class="nav">
                <i class="el-icon-link"></i>友链馆
            </p>
        </el-menu-item>
        <el-menu-item index="/leaveAMessage">
            <p class="nav">
                <i class="el-icon-edit-outline"></i>留言馆
            </p>
        </el-menu-item>
        <el-submenu index="study">
            <template slot="title" style="top:60px">学习馆</template>
            <el-menu-item
                    v-for="(item,index) in classData"
                    :index="item._id | filtration"
                    :key="index"
            >{{item.classify}}</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
    export default {
        name: "NavLeft",
        props:["classData"],
        data() {
            return {
                activeIndex2: '1',
            };
        },
        methods: {
            handleSelect(key, keyPath) {
            },
        },
        filters:{
            filtration(className){
                return '/study/'+className;
            }
        },
        activated(){
        }
    }
</script>

<style scoped lang="scss">
    .el-submenu >>> .el-submenu__title{
        height:80px !important;
        line-height: 80px !important;
    }
    .el-submenu__title{
        font-size: 20px !important;
    }
    .el-menu--horizontal{
        height: 80px;
    }
    .el-menu--horizontal>.el-menu-item{
        line-height: 80px;
        height: 80px !important;
        font-size: 18px !important;
    }
    .el-submenu{
        line-height: 80px !important;
        height: 80px;
    }
</style>