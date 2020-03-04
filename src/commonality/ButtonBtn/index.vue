<template>
    <div id="pages">
            <el-button
                type="primary"
                icon="el-icon-arrow-left"
                id="button-left"
                @click="previous"
                :disabled="page===1?true:false"
            >上一页</el-button>
            <span>{{page}}/{{maxPage}}</span>
            <el-button
                type="primary"
                id="button-right"
                @click="next"
                :disabled="page===maxPage?true:false"
			>下一页
                <i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
    </div>
</template>

<script>
    export default {
        name: "ButtonBtn",
        props:["page","maxPage"],
        methods:{
            //上一页
            previous(){
                this.$emit("previous");
            },
            //下一页
            next(){
               this.$emit("next");
            }
        }
    }
</script>

<style scoped lang="scss">
    #button-left,#button-right{
		float:left;
		margin-top:20px;
	  }
	#button-right{
		float:right;
	  }
    #pages{
		line-height:70px;
		text-align:center;
		font-size: 20px;
	}
</style>