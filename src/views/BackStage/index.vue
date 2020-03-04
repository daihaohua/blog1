<template>
    <div id="">
        <el-container>
            <el-header>
                <h2>
                    <el-button
                            type="info"
                            icon="el-icon-arrow-left"
                            circle
                            @click="handelClick"></el-button>
                    欢迎来到博客后台管理系统
                </h2>
            </el-header>
            <el-container id="content">
                <el-aside width="300px">
                    <SideBar/>
                </el-aside>
                <el-container>
                    <el-main>
                            <transition-ify>
                            <keep-alive>
                                <router-view/>
                            </keep-alive>
                            </transition-ify>
                    </el-main>
                    <el-footer>底部</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
	import {ajax} from "../../api"
    import SideBar from "@/components/admin/SideBar";
    import {Message} from 'element-ui';
    import TransitionIfy from "@/commonality/TransitionIfy"
    export default {
        name: "index",
        components:{
            SideBar,
            TransitionIfy
        },
		methods:{
			handelClick(){
				this.$router.push("/")
			}
		},
		async activated(){
			//获取所有的后台需要的数据
            let {data} = await ajax("/api/backStage/userManagement",{pages:1});
			if (data.state){
                Message.error(data.particulars);
			    this.$router.replace("/")
                return;
            }
			let userData = data;
			this.$store.commit("BackStageData",userData);
        },
    }
</script>

<style scoped lang="scss">
    #content{
        min-height: 700px;
        overflow: hidden;
        overflow-y: auto;
    }
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        line-height: 200px;
    }
    .el-main {
        background-color: #E9EEF3;
        color: #333;
    }
    body > .el-container {
        margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }
    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }
	.retreat{
		padding: 15px;
		background-color: green;
		border-radius: 6px;
		cursor:pointer;
	}
</style>