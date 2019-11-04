<template id="">
    <div>
        <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                router
        >
            <el-menu-item index="/backStage/userManagement">
                <i class="el-icon-user"></i>
                <span slot="title">用户管理</span>
            </el-menu-item>
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-document-copy"></i>
                    <span>分类管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/backStage/checkTheClassification">查看分类</el-menu-item>
                    <el-menu-item index="/backStage/addTheClassification">添加分类</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-collection"></i>
                    <span>文章管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/backStage/toViewTheArticle">查看文章</el-menu-item>
                    <el-menu-item index="/backStage/addTheArticle">添加文章</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
            <template slot="title">
                <i class="el-icon-collection"></i>
                <span>友链操作</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/backStage/friendChainShow">查看友链</el-menu-item>
                <el-menu-item index="/backStage/addFriendsChain">添加友链</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-collection"></i>
                    <span>日记管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/backStage/checkTheDiary">查看日记</el-menu-item>
                    <el-menu-item index="/backStage/diaryManagement">添加日记</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/backStage/showPhotoAlbum">
                <i class="el-icon-chat-line-square"></i>
                <span slot="title">查看相册</span>
            </el-menu-item>
            <el-menu-item index="/backStage/messageManagement">
                <i class="el-icon-chat-line-square"></i>
                <span slot="title">留言管理</span>
            </el-menu-item>
            <el-menu-item index="/backStage/comments">
                <i class="el-icon-chat-line-square"></i>
                <span slot="title">评论管理</span>
            </el-menu-item>
            <el-menu-item index="/backStage/imageManagement">
                <i class="el-icon-picture-outline"></i>
                <span slot="title">轮播图管理</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
    export default {
        name: "index",
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped lang="scss">

</style>