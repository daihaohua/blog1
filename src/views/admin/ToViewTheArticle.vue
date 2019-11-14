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
	</div>
</template>

<script>
    import { MessageBox,Message} from 'element-ui';
    import {ajax} from "../../api"
    import {mapActions} from 'vuex'
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
                    let {data} = await ajax("/api/backStage/DeleteArticles",{_id,classId},"post");
                    Message({
                        type: data.type,
                        message: data.particulars
                    });
                    if(!data.code){//删除成功
                        this.articleData(pages);
                    }
                }).catch(() => {
                    Message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //修改
            reviseAnEssay(index){
                this.$router.push({name:"addTheArticle",params:{index}})
            }
        },
        computed:{
            a(){
                return this.$store.state.articleData;
            },
        },
        watch:{
            a(){
                let {articleDate,page,maxPage} = this.$store.state.articleData;
                this.articleDates =  articleDate;
                this.page = page;
                this.maxPage = maxPage;
            }
        },
        async activated(){
            this.articleData();
        },
        components:{
            // ModifyTheClassification
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
