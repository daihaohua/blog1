<template >
    <div id="TheBottomBar">
        <p>
            Design by：白羊座的梦 备案号：湘ICP备30641438号-2
        </p>
    </div>
</template>

<script>
    export default {
        name: "index",
        watch:{
            $router(){
                console.log(1)
            }
        }
    }
</script>

<style scoped lang="scss">
#TheBottomBar{
    line-height: 70px;
    background-color: #fff;
    text-align: center;
}
</style>