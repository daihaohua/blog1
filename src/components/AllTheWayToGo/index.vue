<template id="">
    <div class="content-right">
        <div class="content-right">
            <h3 class="subtitle"><i class="el-icon-position"></i>一路走来</h3>
        </div>
        <div class="content">
            <p>2019/11/10博客修改样式完善了部分bug再次上线了,这里将会记录我的博客一些功能的修改，样式的修改</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped lang="scss">
    .content-right{
        margin-top: 20px;
        border-radius: 6px;
        .article-contents{
            padding: 10px;
        }
        .subtitle{
            border-bottom: 1px solid #ccc;
            padding: 10px;
            border-left: 3px solid blue;
            background-color: #fff;
        }
        .content{
            padding: 0 10px;
            background-color: #fff;
            p{
                width: 90%;
                font-size: 17px;
                text-indent: 27px;
                font-weight: 300;
                padding: 10px;
                border-bottom:1px solid #ccc;

            }
        }
    }

</style>