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
			>下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
		</div>
	</el-main>
	<modify-the-classification ref="xxx"/>
</div>
</template>
	
<script>
	import { MessageBox,Message} from 'element-ui';
	import {ajax} from "../../api"
    import {mapActions} from 'vuex'
	import ModifyTheClassification from  "./ModifyTheClassification"
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
	        let key = this.$route.path;
	        let {data} = await ajax("/api"+key,{pages:pagee},"get");
	        await this.$store.commit("categoricalData",data);
	      },
	      //分页下一页
	      async next(){
	        let pagee = this.page + 1;
	        let key = this.$route.path;
	        let {data} = await ajax("/api"+key,{pages:pagee},"get");
			await this.$store.commit("categoricalData",data);
	      },
	      // 删除操作
	      async ClassificationDelete(index){
	            let _id = this.CheckTheClassification[index]._id;
	            let classId = this.CheckTheClassification[index].classId;
	            let pages = this.page;
              MessageBox.confirm('是否删除该用户', '操作',{
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(async () => {
                  // //拿到删除后的数据
                  let {data} = await ajax("/api/backStage/classificationDelete",{_id,classId},"post");
                  Message({
                      type: data.type,
                      message: data.particulars
                  });
					if(!data.code){//删除成功
                        this.getCategoricalData(pages);
					}
              }).catch(() => {
                  Message({
                      type: 'info',
                      message: '已取消删除'
                  });
              });
	    },
            //修改
            ClassificationModification(index){
                let classify = this.CheckTheClassification[index].classify;
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
            ModifyTheClassification
		}
}
</script>

<style scoped lang="scss">
	#mian{
		position:relative;
		height: 100%;
	}
	#button-left,#button-right{
		float:left;
		margin-top:20px;
	  }
	#button-right{
		float:right;
	  }
	#pages{
		position: absolute;
		left:0;
		bottom:0;
		right: 0;
		margin:auto;
		line-height:70px;
		text-align:center;
		font-size: 20px;
	  }
</style>
