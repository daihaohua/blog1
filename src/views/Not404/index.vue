<template >
    <div id="Not404">
        <router-link
                 to="/"
                 tag="img"
                 :src="require('../../assets/images/Not404.jpg')"
                  width="100%" height="100%"
        >
        </router-link>
        <img
             onclick="hendelClick"
        >
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped lang="scss">
#Not404{
    width: 95vw;
    height: 90vh;
    overflow: hidden;
    margin: auto;
    img{
        cursor: pointer;
    }
}
</style>