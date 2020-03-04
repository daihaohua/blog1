<template>
	 <div id="mian">
			<el-main>
				<el-table
						:data="CheckTheClassification"
						border>
					<el-table-column
							prop="_id"
							label="_id">
					</el-table-column>
					<el-table-column
							prop="authorId.username"
							label="作者">
					</el-table-column>
					<el-table-column
							prop="classify"
							label="分类名">
					</el-table-column>
					<el-table-column
							prop="articleNum"
							label="文章数">
					</el-table-column>
					<el-table-column
							fixed="right"
							label="操作">
						<template slot-scope="scope">
							<el-button
									type="primary"
									icon="el-icon-edit"
									circle
									@click="ClassificationModification(scope.$index)"></el-button>
							<el-button
									type="danger"
									icon="el-icon-delete"
									circle
									@click="ClassificationDelete (scope.$index)"></el-button>
						</template>
					</el-table-column>
				</el-table>
			<button-btn 
				:page="page" 
				:maxPage="maxPage"
				@previous = "previous"
				@next = "next"
			/>
	</el-main>
	<modify-the-classification ref="xxx"/>
</div>
</template>
	
<script>
	import {mapActions} from 'vuex';
	import { MessageBox,Message} from 'element-ui';
	import {classPages,classDelete} from "../../../api/adminRouter/classify";
	import ModifyTheClassification from  "./ModifyTheClassification";
	export default {
	    name: "UserManagement",
		data(){
			return{
				CheckTheClassification:[],
				classify:"",
				page:1,
				maxPage:1,
			}
		},
		methods:{
	        ...mapActions(['getCategoricalData']),
	      //分页上一页
	      async previous(){
	        let pagee = this.page - 1;
	        let {data} = await classPages({pages:pagee});
	        await this.$store.commit("categoricalData",data);
		  },
		  
	      //分页下一页
	      async next(){
	        let pagee = this.page + 1;
	        let {data} = await classPages({pages:pagee});
			await this.$store.commit("categoricalData",data);
		  },
		  
	      // 删除操作
	      async ClassificationDelete(index){
			    const {_id,classId} = this.CheckTheClassification[index];
	            const pages = this.page;
              MessageBox.confirm('是否删除该用户', '操作',{
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(async () => {
				  //拿到删除后的数据
                  let {data} = await classDelete({_id,classId});
                  Message({
                      type: data.type,
                      message: data.particulars
                  });
				if(!data.code){//删除成功
					//修改仓库数据
					this.getCategoricalData(pages);
				}
              }).catch(() => {});
	    },
		//修改
		ClassificationModification(index){
			let {classify} = this.CheckTheClassification[index];
			let classData= {
				classify,
				pages:this.page
			}
			this.$refs.xxx.headelClose(classData);
		}
	},
        computed:{
            CheckTheClassificationData(){
                return this.$store.state.categoricalData;
            },
        },
        watch:{
            CheckTheClassificationData(){
                let {classDate,page,maxPage} = this.$store.state.categoricalData;
                this.CheckTheClassification =  classDate;
                this.page = page;
                this.maxPage = maxPage;
            }
        },
        async activated(){
	        this.getCategoricalData();
        },
		components:{
			ModifyTheClassification,
		}
}
</script>

<style scoped lang="scss">
	#mian{
		height: 100%;
	}
</style>
