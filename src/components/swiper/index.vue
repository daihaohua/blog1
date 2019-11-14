<template id="">
    <div class="swiper-container" ref="swipers">
        <h3 class="subtitle">
            <i class="el-icon-position"></i>图片专区
        </h3>
        <div class="swiper-wrapper">
            <div class="swiper-slide">
                <ul class="clearfix">
                    <li v-for="(item,index) in 8" :key="index">
                        <img :src="require(`../../assets/images/${index+1}.jpg`)"/>
                    </li>
                </ul>
            </div>
            <div class="swiper-slide">
                <ul class="clearfix">
                    <li v-for="(item,index) in 8" :key="index">
                        <img :src="require(`../../assets/images/${index+2}.jpg`)"/>
                    </li>
                </ul>
            </div>
            <div class="swiper-slide">
                <ul class="clearfix">
                    <li v-for="item in 6">
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
        data(){
            return{
                imgData:[
                    {
                        imgName:'../../assetes/images/1.jpg'
                    }
                ]
            }
        },
        mounted(){
            let swiperContainer = this.$refs.swipers
            new Swiper(swiperContainer, {
                autoplay: {
                     delay: 1000,
                     stopOnLastSlide: false,
                     disableOnInteraction: true,
                     },
            })
        },
        filters:{
            getImg(img){
                return  `../../assetes/images/${img}.jpg`;
            }
        }
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
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            cursor: pointer;
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