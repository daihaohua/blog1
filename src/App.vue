<template>
  <div id="app">
      <transition-ify>
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition-ify>
      <div id="theBottomBar">
          <TheBottomBar />
      </div>
  </div>
</template>
<script>
    import TheBottomBar from "./views/TheBottomBar";
    import TransitionIfy from "@/commonality/TransitionIfy";
    export default {
        components:{
            TheBottomBar,
            TransitionIfy
        }
    }
</script>
<style lang="scss">
#app{
  min-width:1500px;
  margin:auto;
}
</style>
