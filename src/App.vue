<template>
  <div id="app">
       <keep-alive>
            <router-view/>
        </keep-alive>
      <div id="theBottomBar">
          <TheBottomBar />
      </div>
  </div>
</template>
<script>
    import TheBottomBar from "./views/TheBottomBar"
    export default {
        components:{
            TheBottomBar
        }
    }
</script>
<style lang="scss">
#app{
  min-width:1500px;
  margin:auto;
}
</style>
