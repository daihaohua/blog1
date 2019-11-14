<template id="">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item,index) in breadCrumb" :key="index">
            {{item}}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
    export default {
        name: "BreadCrumb",
       props:["breadCrumb"],
    }
</script>

<style scoped lang="scss">
    .breadcrumb{
        font-size: 20px;
        margin-bottom: 20px;
    }
</style>