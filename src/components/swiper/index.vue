<template id="">
    <div class="swiper-container" ref="swipers">
        <h3 class="subtitle">
            <i class="el-icon-position"></i>图片专区
        </h3>
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <ul class="clearfix">
                    <li v-for="item in 10">
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568888030272&di=26f0cb6d35de6c28570b895d375ac481&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201609%2F23%2F20160923164101_SVEek.jpeg"/>
                    </li>
                </ul>
            </div>
            <div class="swiper-slide">
                <ul class="clearfix">
                    <li v-for="item in 10">
                        <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2754826123,4132314108&fm=15&gp=0.jpg"/>
                    </li>
                </ul>
            </div>
            <div class="swiper-slide">
                <ul class="clearfix">
                    <li v-for="item in 10">
                        <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3402044407,1443923896&fm=15&gp=0.jpg"/>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "index",
        mounted(){
            let swiperContainer = this.$refs.swipers
            var mySwiper = new Swiper(swiperContainer, {
                // autoplay: true,//可选选项，自动滑动
            })
        },
    }
</script>

<style scoped lang="scss">
    .clearfix:after{
        display:block;
        content:"";
        clear:both;
    }
    .swiper-container{
        height: 100%;
        background-color: #fff;
        padding-bottom: 50px;
        .subtitle{
            border-bottom: 1px solid #ccc;
            padding: 10px;
            border-left: 3px solid blue;
        }
    }
    .swiper-slide{
        ul{
            li{
                float: left;
                width: 150px;
                height: 150px;
                margin-left: 40px;
                margin-right: 20px;
                margin-top: 10px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
</style>