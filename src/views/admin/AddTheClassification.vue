<template>
	<div>
		<div class="classify">
			<el-input 
				placeholder="请输入分类名" 
				v-model="classify"
				clearable
				size="medium">
				<template slot="prepend">学无止境</template>
			</el-input>
		</div>
		<el-button 
		type="primary" 
		@click="handleClick">添加分类</el-button>
	</div>
		
</template>

<script>
	import {Message} from 'element-ui';
	import {ajax} from "../../api"
	export default {
	    name: "AddTheClassification",
		data(){
			return{
				CheckTheClassification:[],
				classify:"",
				page:1,
				maxPage:1,
			}
		},
		methods:{
			async handleClick(){
				 let key = this.$route.path;
				 let classify = this.classify;
				let {data} = await ajax("/api"+key,{classify},"post");
                Message({
                    type: data.type,
                    message: data.particulars
                });
			}
	    },
	}
</script>

<style>
	.classify{
		width:50%;
		margin-bottom: 20px;
	}
	.el-main[data-v-80c0da60]{
		text-align: left;
	}
</style>
