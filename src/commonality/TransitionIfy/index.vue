<template id="">
    <div>
        <transition mode="out-in">
            <slot></slot>
        </transition>
    </div>
</template>



<style scoped lang="scss">
    
/* 进入过程中 */
.v-enter-active{
  opacity: 0;
  transition: 0.4s;
}
/* 进入结束*/
.v-enter-to{
  opacity: 1;
}
/* 离开开始 */
/* .v-leave{
  opacity: 1;
} */
/* 离开过程中 */
.v-leave-active{
  opacity: 1;
  transition: 0.4s;
}
/* 离开结束 */
.v-leave-to{
   opacity: 0;
}
</style>