
<template id="">
    <div id="logo">
        <router-link to="/" tag="h1">
            <img :src="require('../../assets/images/logo.png')" width="80%" height="80%">
        </router-link>

    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped lang="scss">
#logo{
    height:80px;
    background-color: rgb(84, 92, 100);
    h1{
        float: right;
        height: 80px;
        cursor: pointer;
        text-align:right;
    }
}
</style>