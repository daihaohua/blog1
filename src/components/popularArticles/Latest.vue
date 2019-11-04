<template id="">
    <div class="latest">
        <h3 class="subtitle"><i class="el-icon-position"></i>最新留言</h3>
        <div class="latest-particulars clearfix"
             v-for="(item,index) in LeaveAMessageData"
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
                <p>{{new Date(item.created).toLocaleDateString()}}</p>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "Latest",
        props:["LeaveAMessageData"]
    }
</script>

<style scoped lang="scss">
    .clearfix:after{
        display:block;
        content:"";
        clear:both;
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
        }
    }

</style>