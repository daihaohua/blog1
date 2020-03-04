<template>
	<div id="mian">
		<el-main>
			<el-table
					:data="articleDates"
					border>
				<el-table-column
						prop="_id"
						label="_id"
						width="250"
				>
				</el-table-column>
				<el-table-column
						prop="authorId.username"
						label="作者"
						width="150"
				>
				</el-table-column>
				<el-table-column
						prop="classId.classify"
						label="分类"
						width="150"
				>
				</el-table-column>
				<el-table-column
						prop="title"
						label="文章名"
						width="300"
				>
				</el-table-column>
				<el-table-column
						prop="hits"
						label="点赞数"
						width="100"
				>
				</el-table-column>
				<el-table-column
						prop="comments"
						label="评论量"
						width="100"
				>
				</el-table-column>
				<el-table-column
						prop="reading"
						label="阅读量"
						width="100"
				>
				</el-table-column>
				<el-table-column
						fixed="right"
						label="操作">
					<template slot-scope="scope">
						<el-button
								type="primary"
								icon="el-icon-edit"
								circle
								@click="reviseAnEssay(scope.$index)"></el-button>
						<el-button
								type="danger"
								icon="el-icon-delete"
								circle
								@click="DeleteArticles (scope.$index)"></el-button>
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
	</div>
</template>

<script>
    import { MessageBox,Message} from 'element-ui';
	import {articlePages} from "../../../api/adminRouter/article";
    import {mapActions,mapState} from 'vuex';
    export default {
        name: "ToViewTheArticle",
        data(){
            return{
                articleDates:[],
                classify:"",
                page:1,
                maxPage:1,
            }
		},
		activated(){
            this.articleData();
		},
        methods:{
            ...mapActions(['articleData']),
            //分页上一页
            async previous(){
                let pages = this.page - 1;
                this.articleData(pages);
			},
			
            //分页下一页
            async next(){
                let pages = this.page + 1;
                this.articleData(pages);
			},
			
            // 删除操作
            async DeleteArticles(index){
                let _id = this.articleDates[index]._id;
                let classId = this.articleDates[index].classId;
                let pages = this.page;
                MessageBox.confirm('是否删除该用户', '操作',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
					// //拿到删除后的数据
                    let {data} = await articlePages({_id,classId});
                    Message({
                        type: data.type,
                        message: data.particulars
                    });
                    if(!data.code){//删除成功重新获取数据
                        this.articleData(pages);
                    }
                }).catch(() => {});
            },
            //修改
            reviseAnEssay(index){
                this.$router.push({name:"addTheArticle",params:{index}});
            }
        },
        computed:{
			...mapState({
				"getArticle":"articleData"
			}),
            a(){
                return this.getArticle;
            },
        },
        watch:{
            a(){
                let {articleDate,page,maxPage} = this.getArticle;
                this.articleDates =  articleDate;
                this.page = page;
                this.maxPage = maxPage;
            }
        },
    }
</script>

<style scoped lang="scss">
	#mian{
		height: 100%;
	}
</style>
