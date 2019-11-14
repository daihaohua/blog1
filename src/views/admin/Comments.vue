<template id="">
    <div id="mian">
        <el-main>
            <el-table
                    :data="CommentData"
                    border>
                <el-table-column
                        prop="_id"
                        width="230"
                        label="_id">
                </el-table-column>
                <el-table-column
                        prop="username"
                        width="160"
                        label="用户名">
                </el-table-column>
                <el-table-column
                        prop="articleId.title"
                        width="160"
                        label="文章名">
                </el-table-column>
                <el-table-column
                        prop="textArea"
                        label="留言">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        width="80"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button
                                type="danger"
                                icon="el-icon-delete"
                                circle
                                @click="userDelete(scope.$index)"></el-button>
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
    export default {
        name: "Comments",
        data(){
            return{
                CommentData:[],
                page:1,
                maxPage:1,
            }
        },
        methods:{
            //分页上一页
            async previous(){
                let pages = this.page - 1;
                this.getComment(pages);
            },
            //分页下一页
            async next(){
                let pages = this.page + 1;
                this.getComment(pages);
            },
            // 删除操作
            async userDelete(index){
                let _id = this.CommentData[index]._id
                MessageBox.confirm('是否删除该用户', '操作',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    // //
                    let {data} = await ajax("/api/backStage/deleteComment",{_id},"post");
                    Message({
                        type: data.type,
                        message: data.particulars
                    });
                    this.getComment();
                }).catch(() => {
                    Message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            async getComment(pages){
                let {data} = await  ajax("/api/home/getAllComment",{pages,limit:6})
                let {CommentData,page,maxPage} = data;
                this.CommentData =  CommentData;
                this.page = page;
                this.maxPage = maxPage;

            },
        },
        activated(){
            this.getComment()
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