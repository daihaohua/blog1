<template>
    <div class="SlideShow">
        <el-carousel :interval="4000" type="card" height="300px">
            <el-carousel-item v-for="(item,index) in slideShowData" :key="index">
                <img
                        :src="item.imgName"
                        width="100%"
                        height="100%"
                >
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    export default {
        name: "SlideShow",
        props:["slideShowData"]
    }
</script>

<style scoped lang="scss">
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>