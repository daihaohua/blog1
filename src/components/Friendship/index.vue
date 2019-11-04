<template id="">
    <div class="friendShip">
        <h3 class="subtitle"><i class="el-icon-position"></i>友情链接</h3>
        <div>
            <el-link
                    v-for="(item,index) in listOfFriendship"
                    :key="index"
                    :href="item.AFriendLink"
                    :underline="false"
                    class="link"
                    icon="el-icon-s-custom"
                    target="_blank">{{item.linksName}}
            </el-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        props:["listOfFriendship"]
    }
</script>

<style scoped lang="scss">
.friendShip{
    margin-top: 20px;
    background-color: #fff;
    border-radius: 6px;
    h3{
        border-bottom: 1px solid #ccc;
        padding: 10px;
        border-left: 3px solid blue;
    }
    div{
        padding: 10px 30px;
        .link{
            font-size: 20px;
            margin: 10px 20px;
        }
    }
}
</style>